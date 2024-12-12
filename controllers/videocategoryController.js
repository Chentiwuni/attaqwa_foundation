const VideoCategory = require('../models/videoCategory');
const asyncHandler = require('express-async-handler');

// GET: Display form for adding a new category
exports.getAddCategory = asyncHandler(async (req, res) => {
  res.render('addCategory', { title: 'Add Video Category' });
});

// POST: Add a new video category
exports.postAddCategory = asyncHandler(async (req, res) => {
  const { title } = req.body; // No need to collect `url` from the request body
  await VideoCategory.create({ title }); // URL will be dynamically generated via virtual
  res.redirect('/attaqwa_foundation/add_video_category');
});
