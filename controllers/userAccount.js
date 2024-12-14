const { validationResult } = require('express-validator'); // Import express-validator
const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
  
  // GET: Display User Sign-Up Page
  exports.getUserSignUp = (req, res) => {
      res.render('signup_user', { title: 'User Sign Up' });
    };
  
// POST: Handle User Sign-Up
exports.postUserSignUp = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
  
    // Check for validation errors
    if (!errors.isEmpty()) {
      // Render the sign-up form again with errors and old input data
      return res.status(400).render('signup_user', { 
        title: 'User Sign Up', 
        errors: errors.array(),
        oldInput: req.body 
      });
    }
  
    const { username, phoneNumber, password } = req.body;
  
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create and save the new user with the username, phone number, and hashed password
    const newUser = new User({
      username: username,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });
  
    await newUser.save();
  
    res.redirect('/attaqwa_foundation/user_signup_success');
  });
    
  //Success sign up for user
  exports.getUserSignUpSuccess = (req, res) => {
    res.render('userSignUpSuccess', {
      title: 'Signup Successful'
    });
  };
  
  // GET: Render Sign In Page
exports.getSignInPage = asyncHandler(async (req, res) => {
    res.render('signin', { title: 'Sign In' });
  });

  // POST: Handle User Sign-In
exports.postUserSignIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(401).render('signin', { title: 'Sign In', userError: 'Username and password are required.' });
    }
  
    // Look for the user in the database
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).render('signin', { title: 'Sign In', userError: 'Invalid username or password.' });
    }
  
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).render('signin', { title: 'Sign In', userError: 'Invalid username or password.' });
    }
  
    // Redirect to user dashboard
    res.redirect('/attaqwa_foundation/');
  });
  