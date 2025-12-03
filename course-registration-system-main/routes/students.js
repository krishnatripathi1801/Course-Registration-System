const express = require('express');
const User = require('../models/User');
const Registration = require('../models/Registration');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { department, year, search } = req.query;
    let query = { role: 'student', isActive: true };

    if (department) {
      query.department = department;
    }

    if (year) {
      query.year = year;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await User.find(query)
      .select('-password')
      .sort({ lastName: 1, firstName: 1 });

    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin or the student themselves
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const student = await User.findOne({
      _id: req.params.id,
      role: 'student',
      isActive: true
    }).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/students/:id/registrations
// @desc    Get student's registrations
// @access  Private
router.get('/:id/registrations', auth, async (req, res) => {
  try {
    // Check if user is admin or the student themselves
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { semester, year, status } = req.query;
    let query = { student: req.params.id };

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
      .populate('class', 'section schedule room')
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

// @route   GET /api/students/departments
// @desc    Get all departments
// @access  Public
router.get('/departments', async (req, res) => {
  try {
    const departments = await User.distinct('department', {
      role: 'student',
      isActive: true,
      department: { $exists: true, $ne: null }
    });

    res.json(departments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
