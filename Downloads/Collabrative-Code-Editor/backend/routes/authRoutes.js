const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    console.log('Received data:', { email, username, password }); // Debugging line
    const user = new User({ email, username, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error:', err); // Debugging line
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Removed username from the destructuring
  try {
    const user = await User.findOne({ email }); // Only search by email
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username }); // Include username in the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
