const express = require('express');
const { customerRegister, adminRegister, verifyEmail, adminLogin, resendVerificationCode } = require('../controllers/authControllers');

const router = express.Router();

// Register routes
router.post('/customer/register', customerRegister);
router.post('/admin/register', adminRegister);

// Email verification route
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationCode);

// Admin login route
router.post('/admin/login', adminLogin);



module.exports = router;
