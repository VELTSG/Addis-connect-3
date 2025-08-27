const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

// POST /api/auth/login
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

		const admin = await Admin.findOne({ email: email.toLowerCase() });
		if (!admin) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const ok = await bcrypt.compare(password, admin.passwordHash);
		if (!ok) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
		return res.json({ token, user: { id: admin._id, email: admin.email, role: admin.role } });
	} catch (err) {
		console.error('Login error:', err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

// POST /api/auth/create (for bootstrapping or superadmin use)
exports.createUser = async (req, res) => {
	try {
		const { email, username, password, role } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

		const exists = await Admin.findOne({ email: email.toLowerCase() });
		if (exists) return res.status(409).json({ message: 'Email already in use' });

		const passwordHash = await bcrypt.hash(password, 10);
	const admin = await Admin.create({ email: email.toLowerCase(), username, passwordHash, role: role || 'editor' });
	return res.status(201).json({ id: admin._id, email: admin.email, role: admin.role });
	} catch (err) {
		console.error('Create user error:', err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

// POST /api/auth/signup (public): create a normal user account
exports.signup = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

		const exists = await Admin.findOne({ email: email.toLowerCase() });
		if (exists) return res.status(409).json({ message: 'Email already in use' });

		const passwordHash = await bcrypt.hash(password, 10);
	const user = await Admin.create({ email: email.toLowerCase(), username, passwordHash, role: 'user' });
	return res.status(201).json({ id: user._id, email: user.email, role: user.role });
	} catch (err) {
		console.error('Signup error:', err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
