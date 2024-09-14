const express = require('express');
const { registerUser, verifyEmail, loginAdmin } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/verify/:token', verifyEmail);
router.post('/login-admin', loginAdmin);
module.exports = router;
