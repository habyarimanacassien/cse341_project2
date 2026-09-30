const mongoose = require('mongoose');
const memberRef = require('./memberRef');
const amountsByPeriod = require('./amountsByPeriod');

const withdrawSchema = new mongoose.Schema({
    memberId: memberRef,
    months: amountsByPeriod(/^\d{4}-(0[1-9]|1[0-2])$/, '2025-11')
}, { versionKey: false, toJSON: { flattenMaps: true } });

withdrawSchema.index({ memberId: 1 }, { unique: true });

module.exports = mongoose.model('Withdraw', withdrawSchema, 'withdraws');