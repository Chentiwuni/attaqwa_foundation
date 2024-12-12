const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoCategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

// Virtual for the category URL
videoCategorySchema.virtual('url').get(function () {
  return `/attaqwa_foundation/video_categories/${this._id}`;
});


module.exports = mongoose.model('VideoCategory', videoCategorySchema);
