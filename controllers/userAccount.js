const { validationResult } = require('express-validator'); // Import express-validator
const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
  
exports.getUserSignUp = (req, res) => {
    res.render('signup_user', {
      title: 'User Sign Up',
      errors: [],
      oldInput: { username: '', phoneNumber: '' },
    });
  };
    
    exports.postUserSignUp = asyncHandler(async (req, res) => {
        const { username, phoneNumber, password } = req.body;
      
        // Validate request fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).render('signup_user', {
            title: 'User Sign Up',
            errors: errors.array(),
            oldInput: { username: username || '', phoneNumber: phoneNumber || '' },
          });
        }
      
        // Check for existing username or phone number
        const existingPhoneNumber = await User.findOne({ phoneNumber });
        const existingUser = await User.findOne({ username });
      
        if (existingPhoneNumber || existingUser) {
          return res.status(400).render('signup_user', {
            title: 'User Sign Up',
            errors: [
              existingPhoneNumber
                ? { msg: 'Phone number is already registered' }
                : { msg: 'Username is already taken' },
            ],
            oldInput: { username, phoneNumber },
          });
        }
      
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
      
        // Save the new user
        const newUser = new User({
          username,
          phoneNumber,
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
  