const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  level: {
    type: String,
    enum: ['Undergraduate', 'Graduate', 'Both'],
    default: 'Undergraduate'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxCapacity: {
    type: Number,
    default: 30
  },
  currentEnrollment: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for checking if course is full
courseSchema.virtual('isFull').get(function() {
  return this.currentEnrollment >= this.maxCapacity;
});

module.exports = mongoose.model('Course', courseSchema);
