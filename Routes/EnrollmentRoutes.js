const express = require('express');
const Enrollment = require('../Modal/Enrollment');
const router = express.Router();

const DUMMY_STUDENT_ID = 'dummyStudent123';

// GET: Enrollments for the current student
router.get('/me', async (req, res) => {
  const enrollments = await Enrollment.find({ studentId: DUMMY_STUDENT_ID }).populate('courseId');
  res.json(enrollments);
});

// POST: Enroll in a course
router.post('/', async (req, res) => {
  const { courseId } = req.body;

  const existing = await Enrollment.findOne({ courseId, studentId: DUMMY_STUDENT_ID });
  if (existing) return res.status(400).json({ message: 'Already enrolled' });

  const newEnroll = new Enrollment({ courseId, studentId: DUMMY_STUDENT_ID });
  await newEnroll.save();

  res.status(201).json(newEnroll);
});

module.exports = router;
