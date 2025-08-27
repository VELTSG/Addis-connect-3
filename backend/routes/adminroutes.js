const express = require('express');
const router = express.Router();

const { login, createUser, signup } = require('../controller/admincontroller');
const auth = require('../middleware/auth');

// Auth routes
router.post('/login', login);
router.post('/signup', signup);

// Create user - you might want to protect this to admin only in production
router.post('/create', auth(['admin']), createUser);

module.exports = router;
