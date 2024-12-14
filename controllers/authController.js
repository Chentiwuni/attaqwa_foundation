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

// POST: Handle User Sign-Up
exports.postUserSignUp = asyncHandler(async (req, res) => {
  const { username, phoneNumber, password, confirmPassword } = req.body;

  // Check if username, phone number, password, or confirm password are missing
  if (!username || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).send('All fields are required');
  }

  // Validate phone number pattern
  const phonePattern = /^(\+233|0)[1-9]{1}[0-9]{8}$/;
  if (!phonePattern.test(phoneNumber)) {
    return res.status(400).send('Invalid phone number');
  }

  // Ensure passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  // Check if phone number is already in use
  const existingPhoneNumber = await User.findOne({ phoneNumber });
  if (existingPhoneNumber) {
    return res.status(400).send('Phone number is already registered');
  }

  // Check if username is already taken
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send('Username is already taken');
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user with the username, phone number, and hashed password
  const newUser = new User({
    username: username,
    phoneNumber: phoneNumber,
    password: hashedPassword
  });

  await newUser.save();

  res.redirect('/attaqwa_foundation/success');
});

//Success sign up
exports.getSuccess = (req, res) => {
  res.render('success', {
    title: 'Signup Successful'
  });
};


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
      req.session.user = user._id;
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
    req.session.admin = admin._id;
    res.redirect('/attaqwa_foundation/dashboard'); // Redirect to admin dashboard
  } else {
    res.status(401).send('Invalid admin credentials');
  }
});

exports.getAdminDashboard = (req, res) => {
    // Check if admin is logged in
    if (!req.session.admin) {
        return res.redirect('/attaqwa_foundation/signin/user');
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
    