const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['registered', 'dropped', 'waitlisted', 'completed'],
    default: 'registered'
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'W', 'I'],
    default: undefined
  },
  creditsEarned: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Ensure one registration per student per class
registrationSchema.index({ student: 1, class: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
