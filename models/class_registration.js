const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  classSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSession',
    required: true,
  },
  momoReferenceName: {
    type: String,
    required: true,
  },
  accessCodeAssigned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);
