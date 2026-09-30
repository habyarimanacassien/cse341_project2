const mongoose = require('mongoose');
const memberRef = require('./memberRef');

const loanSchema = new mongoose.Schema({
    memberId: memberRef,
    totalLoan: { type: Number, required: [true, 'totalLoan is required'], min: [1, 'totalLoan must be greater than 0'] },
    period: { type: Number, required: [true, 'period (in months) is required'], min: [1, 'period must be at least 1 month'] }
}, { versionKey: false });

loanSchema.index({ memberId: 1 });

module.exports = mongoose.model('Loan', loanSchema, 'loans');