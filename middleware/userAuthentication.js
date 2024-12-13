// middleware/auth.js
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // User is authenticated
  }
  return res.redirect('/attaqwa_foundation/signin/user'); // Redirect to login page if not authenticated
};

module.exports = isAuthenticated;
