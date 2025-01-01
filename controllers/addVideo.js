const Video = require('../models/addVideo'); // Video Model
const VideoCategory = require('../models/videoCategory'); // VideoCategory Model
const asyncHandler = require('express-async-handler');

exports.getAddVideo = asyncHandler(async (req, res) => {
  const success = req.flash('success'); // Explicitly fetch 'success' messages
  const error = req.flash('error');    // Explicitly fetch 'error' messages

  console.log('Flash Success on GET:', success);
  console.log('Flash Error on GET:', error);

  const videoCategories = await VideoCategory.find();
  res.render('addVideo', {
    title: 'Add Video',
    videoCategories,
    success,
    error,
  });
});

function getEmbedUrl(youtubeUrl) {
  let videoId;

  const standardMatch = youtubeUrl.match(/v=([^&]+)/);
  if (standardMatch) videoId = standardMatch[1];

  const shortMatch = youtubeUrl.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) videoId = shortMatch[1];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

exports.postAddVideo = asyncHandler(async (req, res) => {
  const { category, youtubeUrl } = req.body;

  if (!category || !youtubeUrl) {
    req.flash('error', 'All fields are required!');
    return res.redirect('/attaqwa_foundation/add_video');
  }

  const embedUrl = getEmbedUrl(youtubeUrl);
  if (!embedUrl) {
    req.flash('error', 'Invalid YouTube URL!');
    return res.redirect('/attaqwa_foundation/add_video');
  }

  try {
    const video = new Video({ category, youtubeUrl: embedUrl });
    await video.save();
    req.flash('success', 'Video added successfully!');
    res.redirect('/attaqwa_foundation/add_video');
  } catch (err) {
    req.flash('error', 'Failed to add video. Please try again later.');
    res.redirect('/attaqwa_foundation/add_video');
  }
});
