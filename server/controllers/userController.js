// controllers/userController.js

const User = require('../models/reliefCenter');

exports.getUserData = async (req, res) => {
  try {
    const userData = await User.find();
    
    res.json(userData);
  } catch (error) {
    
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
