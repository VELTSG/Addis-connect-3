const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);