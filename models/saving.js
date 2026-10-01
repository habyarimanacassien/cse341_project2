const mongoose = require('mongoose');
const memberRef = require('./memberRef');
const amountsByPeriod = require('./amountsByPeriod');

const savingSchema = new mongoose.Schema({
    memberId: memberRef,
    startUp: { type: Number, required: [true, 'startUp is required'], min: [0, 'startUp cannot be negative'] },
    months: amountsByPeriod(/^\d{4}-(0[1-9]|1[0-2])$/, '2025-11') // { "2025-11": 66000, ... }
}, { versionKey: false, toJSON: { flattenMaps: true } });

savingSchema.index({ memberId: 1 }, { unique: true });

module.exports = mongoose.model('Saving', savingSchema, 'savings');