require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Persistent session store
const mongoose = require('mongoose');

const attaqwaRouter = require("./routes/attaqwa_foundation");
const usersRouter = require('./routes/users');

const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || "your-mongo-uri-here";

mongoose.connect(mongoDB,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/attaqwa_foundation', express.static(path.join(__dirname, 'public')));

// Session middleware with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-default-secret',
  resave: false,
  saveUninitialized: false, // Only save sessions when modified
  store: MongoStore.create({
    mongoUrl: mongoDB,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: false, // Set to `true` if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// Routes
app.use('/attaqwa_foundation', attaqwaRouter);
app.use('/users', usersRouter);

// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;