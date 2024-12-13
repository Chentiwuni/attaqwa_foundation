const Question = require('../models/question');
const VideoCategory = require('../models/videoCategory');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res) => {
  const liveVideoUrl = "https://www.youtube.com/embed/YOUR_LIVE_STREAM_ID"; // Replace with dynamic URL if needed
  
  // Fetch video categories from the database
  const videoCategories = await VideoCategory.find();

  // Fetch the latest 5 questions from the database
  const questions = await Question.find().sort({ createdAt: -1 }).limit(5);

  res.render('index', { 
    liveVideoUrl, 
    videoCategories,
    questions // Pass questions to the view
  });
});
