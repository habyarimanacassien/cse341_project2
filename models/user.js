const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true, trim: true },
    displayName: { type: String, trim: true },
    avatarUrl: { type: String, trim: true },
    profileUrl: { type: String, trim: true },
    lastLogin: { type: Date, default: Date.now }
}, { versionKey: false, timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('User', userSchema, 'users');
