const mongoose = require('mongoose');
const memberRef = require('./memberRef');
const amountsByPeriod = require('./amountsByPeriod');

const interestSchema = new mongoose.Schema({
    memberId: memberRef,
    years: amountsByPeriod(/^\d{4}$/, '2026') // { "2025": 155000, "2026": 192000 }
}, { versionKey: false, toJSON: { flattenMaps: true } });

interestSchema.index({ memberId: 1 }, { unique: true }); // one document per member

module.exports = mongoose.model('Interest', interestSchema, 'interest');
