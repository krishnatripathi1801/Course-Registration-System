const express = require('express');
const Class = require('../models/Class');
const Course = require('../models/Course');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/classes
// @desc    Get all classes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { semester, year, department, professor, course } = req.query;
    let query = { isActive: true };

    if (semester) {
      query.semester = semester;
    }

    if (year) {
      query.year = parseInt(year);
    }

    if (professor) {
      query.professor = professor;
    }

    if (course) {
      query.course = course;
    }

    let classes = await Class.find(query)
      .populate('course', 'courseCode courseName credits department')
      .populate('professor', 'firstName lastName email department')
      .sort({ 'course.courseCode': 1, section: 1 });

    // Filter by department if specified
    if (department) {
      classes = classes.filter(cls => 
        cls.course.department === department || 
        cls.professor.department === department
      );
    }

    res.json(classes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/classes/:id
// @desc    Get class by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate('course', 'courseCode courseName credits department description')
      .populate('professor', 'firstName lastName email department phone');

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/classes
// @desc    Create a new class
// @access  Private (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const classData = new Class(req.body);
    await classData.save();

    await classData.populate('course', 'courseCode courseName credits department');
    await classData.populate('professor', 'firstName lastName email department');

    res.status(201).json(classData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/classes/:id
// @desc    Update class
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('course', 'courseCode courseName credits department')
     .populate('professor', 'firstName lastName email department');

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/classes/:id
// @desc    Delete class
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json({ message: 'Class deactivated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
