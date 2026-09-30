const Loan = require('../models/loan');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Loans'];
    try {
        const loans = await Loan.find().populate('memberId', 'familyName firstName');
        res.status(200).json(loans);
    } catch (error) {
        next(error);
    }
};

const getByMember = async (req, res, next) => {
    //#swagger.tags=['Loans'];
    //#swagger.description='Records of one member. Use the _id from GET /profile.';
    try {
        const loans = await Loan.find({ memberId: req.params.memberId }).populate('memberId', 'familyName firstName');
        res.status(200).json(loans);
    } catch (error) {
        next(error);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Loans'];
    try {
        const loan = await Loan.findById(req.params.id).populate('memberId', 'familyName firstName');
        if (!loan) return res.status(404).json({ message: 'Loan not found.' });
        res.status(200).json(loan);
    } catch (error) {
        next(error);
    }
};

const createLoan = async (req, res, next) => {
    //#swagger.tags=['Loans'];
    //#swagger.parameters['body'] = { in: 'body', schema: { $memberId: 'member id from GET /profile', $totalLoan: 2000000, $period: 12 } };
    try {
        const loan = await Loan.create(req.body);
        res.status(201).json(loan);
    } catch (error) {
        next(error);
    }
};

const updateLoan = async (req, res, next) => {
    //#swagger.tags=['Loans'];
    //#swagger.parameters['body'] = { in: 'body', schema: { totalLoan: 2500000, period: 18 } };
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) return res.status(404).json({ message: 'Loan not found.' });
        loan.set(req.body);
        await loan.save();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const deleteLoan = async (req, res, next) => {
    //#swagger.tags=['Loans'];
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);
        if (!loan) return res.status(404).json({ message: 'Loan not found.' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getByMember,
    getSingle,
    createLoan,
    updateLoan,
    deleteLoan
};
