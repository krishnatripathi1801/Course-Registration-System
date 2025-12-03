const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  semester: {
    type: String,
    required: true,
    enum: ['Fall', 'Spring', 'Summer']
  },
  year: {
    type: Number,
    required: true
  },
  section: {
    type: String,
    required: true,
    trim: true
  },
  schedule: {
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    room: {
      type: String,
      required: true,
      trim: true
    }
  },
  maxCapacity: {
    type: Number,
    required: true,
    default: 30
  },
  currentEnrollment: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Virtual for checking if class is full
classSchema.virtual('isFull').get(function() {
  return this.currentEnrollment >= this.maxCapacity;
});

// Virtual for available spots
classSchema.virtual('availableSpots').get(function() {
  return this.maxCapacity - this.currentEnrollment;
});

module.exports = mongoose.model('Class', classSchema);
