const Question = require('../models/question');
const VideoCategory = require('../models/videoCategory');
const axios = require('axios');
const asyncHandler = require('express-async-handler');

// YouTube API Credentials
const YOUTUBE_API_KEY = 'AIzaSyCZV3KPk9vQK3Rrkwz4alWgslhHmoVSf14'; // Replace with your API Key
const CHANNEL_ID = 'https://www.youtube.com/channel/UCuc74pUfHQ0w4wLxe9yeIRg'; // Replace with your YouTube channel ID

exports.index = asyncHandler(async (req, res) => {
  let liveVideoUrl = "https://www.youtube.com/embed/xjxOWSmSjnU"; // Fallback video

  try {
    // Fetch YouTube live broadcasts for the specified channel
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'id',
        channelId: CHANNEL_ID,
        eventType: 'live', // Get only active live streams
        type: 'video',
        key: YOUTUBE_API_KEY
      }
    });

    // Extract the live videoId from the API response
    if (response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;
      liveVideoUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (error) {
    console.error('Error fetching live video:', error.message);
  }

  // Fetch video categories and answered questions from the database
  const videoCategories = await VideoCategory.find();
  const questions = await Question.find({ isAnswered: true }).sort({ createdAt: -1 }).limit(5);

  // Render the updated view
  res.render('index', { 
    liveVideoUrl, 
    videoCategories,
    questions
  });
});
