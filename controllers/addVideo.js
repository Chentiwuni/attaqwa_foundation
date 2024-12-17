const Video = require('../models/addVideo'); // Video Model
const VideoCategory = require('../models/videoCategory'); // VideoCategory Model
const asyncHandler = require('express-async-handler');

// GET: Render form to add video
exports.getAddVideo = asyncHandler(async (req, res) => {
    const videoCategories = await VideoCategory.find();
    res.render('addVideo', {
      title: 'Add Video',
      videoCategories,
    });
  });
  
// Helper function to convert a YouTube URL into embed format
function getEmbedUrl(youtubeUrl) {
    let videoId;
  
    // Check if the URL is a standard YouTube URL (e.g., https://www.youtube.com/watch?v=abc123)
    const standardMatch = youtubeUrl.match(/v=([^&]+)/);
    if (standardMatch) videoId = standardMatch[1];
  
    // Check if the URL is a shortened YouTube URL (e.g., https://youtu.be/abc123)
    const shortMatch = youtubeUrl.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) videoId = shortMatch[1];
  
    // Return embed URL if video ID exists
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  
    return null; // Return null if the URL is invalid
  }
  
  // POST: Handle form submission to add video
  exports.postAddVideo = asyncHandler(async (req, res) => {
      const { category, youtubeUrl } = req.body;
  
      // Validation: Ensure all fields are filled
      if (!category || !youtubeUrl) {
        req.flash('error', 'All fields are required!');
        return res.redirect('/attaqwa_foundation/add_video');
      }
  
      // Convert YouTube URL to embed format
      const embedUrl = getEmbedUrl(youtubeUrl);
      if (!embedUrl) {
        req.flash('error', 'Invalid YouTube URL!');
        return res.redirect('/attaqwa_foundation/add_video');
      }
  
      // Create and save a new video
      const video = new Video({
        category,
        youtubeUrl: embedUrl, // Save the formatted embed URL
      });
  
      await video.save();
  
      req.flash('success', 'Video added successfully!');
      res.redirect('/attaqwa_foundation/add_video');
  });
    