exports.isUserAuthenticated = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/signin');
  };

  exports.isAdminAuthenticated = (req, res, next) => {
    if (req.session.adminId) return next();
    res.redirect('/signin');
  };
  