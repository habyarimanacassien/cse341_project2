const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    familyName: { type: String, required: [true, 'familyName is required'], trim: true },
    firstName: { type: String, required: [true, 'firstName is required'], trim: true },
    email: {
        type: String, required: [true, 'email is required'], trim: true, lowercase: true, unique: true,
        match: [/^\S+@\S+\.\S+$/, 'email must be a valid email address']
    },
    phoneNumber: {
        type: String, required: [true, 'phoneNumber is required'], trim: true, unique: true,
        match: [/^\+2507[2389]\d{7}$/, 'phoneNumber must look like +250788123456']
    },
    nationalID: {
        type: String, required: [true, 'nationalID is required'], trim: true, unique: true,
        match: [/^\d{16}$/, 'nationalID must be exactly 16 digits']
    },
    address: {
        type: String, required: [true, 'address is required'], trim: true,
        enum: { values: ['North', 'South', 'East', 'West', 'Kigali'], message: 'address must be North, South, East, West or Kigali' }
    },
    memberSince: {
        type: Number, required: [true, 'memberSince is required'],
        min: [2015, 'memberSince must be 2015 or later'],
        max: [new Date().getFullYear(), 'memberSince cannot be in the future']
    }
}, { versionKey: false });

module.exports = mongoose.model('Profile', profileSchema, 'profile');