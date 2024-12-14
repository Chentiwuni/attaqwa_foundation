// middleware/auth.js
const isAdmin = (req, res, next) => {
    if (req.session && req.session.admin) {
      return next(); // User is authenticated
    }
    return res.redirect('/attaqwa_foundation/signin'); // Redirect to login page if not authenticated
  };
  
  module.exports = isAdmin;
  