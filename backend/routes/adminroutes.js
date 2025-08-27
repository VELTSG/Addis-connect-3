const express = require('express');
const router = express.Router();


const { login, createUser, signup } = require('../controller/admincontroller');
const auth = require('../middleware/auth');
const { loginValidator, signupValidator, createUserValidator } = require('../middleware/validators');
const { validationResult } = require('express-validator');

function validate(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array()[0].msg });
	}
	next();
}

// Auth routes
router.post('/login', loginValidator, validate, login);
router.post('/signup', signupValidator, validate, signup);

// Create user - superadmin only
router.post('/create', auth(['superadmin']), createUserValidator, validate, createUser);

module.exports = router;
