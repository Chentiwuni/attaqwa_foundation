// controllers/authController.js
const { validationResult } = require('express-validator'); // Import express-validator
const asyncHandler = require('express-async-handler');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

// GET: Render Sign In Page
exports.getSignInPage = asyncHandler(async (req, res) => {
  res.render('signin', { title: 'Sign In' });
});

// GET:  Admin Sign-Up Page
exports.getAdminSignUp = (req, res) => {
  res.render('signup_admin', { errors: [], oldInput: {} }); // Ensure `errors` and `oldInput` are passed
};

// POST: Admin Sign Up Page
exports.postAdminSignUp = [
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Render the signup page with errors and old input data
      return res.status(400).render('signup_admin', {
        errors: errors.array(), // Pass errors to the view
        oldInput: req.body, // For repopulating fields
      });
    }

    const { username, password } = req.body;

    // Check if username is already taken
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).render('signup_admin', {
        errors: [{ msg: 'Username is already taken' }], // Format consistent with express-validator
        oldInput: req.body, // Retain input
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.redirect('/attaqwa_foundation/admin_signup_success'); // Redirect to sign-in on success
  }),
];

//Success sign up for admin
exports.getAdminSignUpSuccess = (req, res) => {
  res.render('adminSignUpSuccess', {
    title: 'Signup Successful'
  });
};


// POST: Handle Admin Sign-In
exports.postAdminSignIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(401).render('signin', { title: 'Sign In', adminError: 'Username and password are required.' });
    }

    // Look for the admin in the database
    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res.status(401).render('signin', { title: 'Sign In', adminError: 'Invalid username or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).render('signin', { title: 'Sign In', adminError: 'Invalid username or password.' });
    }

    // Redirect to admin dashboard
    res.redirect('/attaqwa_foundation/dashboard');
});

// GET: Render Sign In Page
exports.getSignInPage = asyncHandler(async (req, res) => {
  res.render('signin', { title: 'Sign In' });
});


//GET: Admin Dashs Board
exports.getAdminDashboard = (req, res) => {
    // Check if admin is logged in
    if (!req.session.admin) {
        return res.redirect('/attaqwa_foundation/signin');
    }
    res.render('admin_dashboard', { title: 'Admin Dashboard' });
};
    