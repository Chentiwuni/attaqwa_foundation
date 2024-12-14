const asyncHandler = require('express-async-handler');

// Sign out route
exports.signOut = asyncHandler(async (req, res) => {
    req.session.destroy(err => {
      if (err) return res.status(500).send('Error logging out');
      res.redirect('/signin');
    });
  });
