const express = require('express');
const Registration = require('../models/Registration');
const Class = require('../models/Class');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/registrations
// @desc    Register for a class
// @access  Private (Student only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can register for classes' });
    }

    const { classId, semester, year } = req.body;

    // Check if class exists and is active
    const classData = await Class.findById(classId).populate('course');
    if (!classData || !classData.isActive) {
      return res.status(404).json({ message: 'Class not found or not available' });
    }

    // Check if student is already registered for this class
    const existingRegistration = await Registration.findOne({
      student: req.user.id,
      class: classId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this class' });
    }

    // Check if class is full
    if (classData.isFull) {
      return res.status(400).json({ message: 'Class is full' });
    }

    // Create registration
    const registration = new Registration({
      student: req.user.id,
      class: classId,
      semester,
      year,
      creditsEarned: classData.course.credits
    });

    await registration.save();

    // Update class enrollment
    classData.currentEnrollment += 1;
    await classData.save();

    // Populate the registration with class and course details
    await registration.populate({
      path: 'class',
      populate: {
        path: 'course',
        select: 'courseCode courseName credits department'
      }
    });

    await registration.populate({
      path: 'class',
      populate: {
        path: 'professor',
        select: 'firstName lastName email'
      }
    });

    res.status(201).json(registration);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/registrations/:id
// @desc    Drop a class
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check if user is admin or the student themselves
    if (req.user.role !== 'admin' && registration.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update class enrollment
    const classData = await Class.findById(registration.class);
    if (classData) {
      classData.currentEnrollment -= 1;
      await classData.save();
    }

    // Update registration status
    registration.status = 'dropped';
    await registration.save();

    res.json({ message: 'Successfully dropped the class' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/registrations
// @desc    Get all registrations (Admin) or user's registrations
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { student, semester, year, status } = req.query;
    let query = {};

    // If user is student, only show their registrations
    if (req.user.role === 'student') {
      query.student = req.user.id;
    } else if (student) {
      query.student = student;
    }

    if (semester) {
      query.semester = semester;
    }

    if (year) {
      query.year = parseInt(year);
    }

    if (status) {
      query.status = status;
    }

    const registrations = await Registration.find(query)
      .populate('student', 'firstName lastName studentId email')
      .populate({
        path: 'class',
        populate: {
          path: 'course',
          select: 'courseCode courseName credits department'
        }
      })
      .populate({
        path: 'class',
        populate: {
          path: 'professor',
          select: 'firstName lastName email'
        }
      })
      .sort({ registrationDate: -1 });

    res.json(registrations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/registrations/:id/grade
// @desc    Update grade for a registration
// @access  Private (Professor or Admin only)
router.put('/:id/grade', auth, async (req, res) => {
  try {
    // Check if user is professor or admin
    if (req.user.role !== 'professor' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { grade } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { grade },
      { new: true, runValidators: true }
    ).populate('student', 'firstName lastName studentId')
     .populate({
       path: 'class',
       populate: {
         path: 'course',
         select: 'courseCode courseName credits'
       }
     });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json(registration);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
