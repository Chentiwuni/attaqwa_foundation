const asyncHandler = require('express-async-handler');

exports.getLiveClass = asyncHandler(async (req, res) => {
  // Determine user data based on session
  let user = null;

  if (req.session.admin) {
    user = { name: req.session.admin.name, role: "admin" };
  } else if (req.session.user) {
    user = { name: req.session.user.name, role: req.session.user.role };
  }

  res.render('live_class', { user });
});
