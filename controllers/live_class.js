const asyncHandler = require('express-async-handler');

exports.getLiveClass = asyncHandler(async (req, res) => {
  const { accessCode } = req.session;

  if (!accessCode) {
    req.flash('error', 'Access code is required to join the live class.');
    return res.redirect('/live_class_auth');
  }

  const registration = await Registration.findOne({ accessCode }).populate('classSessionId');

  if (!registration) {
    req.flash('error', 'Invalid access code.');
    return res.redirect('/live_class_auth');
  }

  if (registration.codeExpiration < new Date()) {
    req.flash('error', 'Access code has expired.');
    return res.redirect('/live_class_auth');
  }

  res.render('liveClass', {
    title: 'Live Class',
    classSession: registration.classSessionId,
  });
});

