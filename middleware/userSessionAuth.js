// middleware/auth.js
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // User is authenticated
  }
  return res.redirect('/signin'); // Redirect to login page if not authenticated
};

module.exports = isAuthenticated;
