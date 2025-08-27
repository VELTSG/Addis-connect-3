const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    link: { type: String, required: true },
    apiurl: { type: String },
    keywords: [{ type: String }],
    isActive: { type: Boolean, default: true },
    status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'approved' },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);