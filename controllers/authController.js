// controllers/authController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

// GET: Render Sign In Page
exports.getSignInPage = asyncHandler(async (req, res) => {
  res.render('signin', { title: 'Sign In' });
});

// GET: Display User Sign-Up Page
exports.getUserSignUp = (req, res) => {
    res.render('signup_user', { title: 'User Sign Up' });
  };

// POST: Handle User Sign-Up Form Submission
exports.postUserSignUp = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/signin'); // Redirect to sign-in after successful sign-up
  });

  // GET: Display Admin Sign-Up Page
exports.getAdminSignUp = (req, res) => {
    res.render('signup_admin', { title: 'Admin Sign Up' });
  };

  // POST: Handle Admin Sign-Up Form Submission
exports.postAdminSignUp = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.redirect('/attaqwa_foundation/signin/user'); // Redirect to sign-in after successful sign-up
  });

// POST: Handle User Sign-In
exports.postUserSignIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      res.redirect('/attaqwa_foundation/');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });

// POST: Handle Admin Sign-In
exports.postAdminSignIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    req.session.adminId = admin._id;
    res.redirect('/attaqwa_foundation/dashboard'); // Redirect to admin dashboard
  } else {
    res.status(401).send('Invalid admin credentials');
  }
});

exports.getAdminDashboard = (req, res) => {
    // Check if admin is logged in
    if (!req.session.adminId) {
        return res.redirect('/signin/admin');
    }
    res.render('admin_dashboard', { title: 'Admin Dashboard' });
};


// Sign out route
exports.signOut = asyncHandler(async (req, res) => {
    req.session.destroy(err => {
      if (err) return res.status(500).send('Error logging out');
      res.redirect('/signin');
    });
  });
    