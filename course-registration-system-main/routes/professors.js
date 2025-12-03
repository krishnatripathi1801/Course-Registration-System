const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/professors
// @desc    Get all professors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { department, search } = req.query;
    let query = { role: 'professor', isActive: true };

    if (department) {
      query.department = department;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const professors = await User.find(query)
      .select('-password')
      .sort({ lastName: 1, firstName: 1 });

    res.json(professors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/professors/:id
// @desc    Get professor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const professor = await User.findOne({
      _id: req.params.id,
      role: 'professor',
      isActive: true
    }).select('-password');

    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    res.json(professor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/professors/departments
// @desc    Get all departments
// @access  Public
router.get('/departments', async (req, res) => {
  try {
    const departments = await User.distinct('department', {
      role: 'professor',
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
