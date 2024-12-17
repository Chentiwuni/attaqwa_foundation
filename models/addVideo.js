const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoCategory', required: true }, // Video Category
  youtubeUrl: { type: String, required: true }, // YouTube video link
  createdAt: { type: Date, default: Date.now }, // Date created
});

module.exports = mongoose.model('Video', videoSchema);
