const asyncHandler = require('express-async-handler');
const VideoCategory = require('../models/videoCategory'); // Adjust the path to your model

exports.index = asyncHandler(async (req, res) => {
  const liveVideoUrl = "https://www.youtube.com/embed/YOUR_LIVE_STREAM_ID"; // Replace with dynamic URL if needed
  
  // Fetch video categories from the database
  const videoCategories = await VideoCategory.find();

  res.render('index', { liveVideoUrl, videoCategories });
});
