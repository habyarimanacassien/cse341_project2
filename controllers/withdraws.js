const Withdraw = require('../models/withdraw');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Withdraws'];
    try {
        const withdraws = await Withdraw.find().populate('memberId', 'familyName firstName');
        res.status(200).json(withdraws);
    } catch (error) {
        next(error);
    }
};

const getByMember = async (req, res, next) => {
    //#swagger.tags=['Withdraws'];
    //#swagger.description='Records of one member. Use the _id from GET /profile.';
    try {
        const withdraws = await Withdraw.find({ memberId: req.params.memberId }).populate('memberId', 'familyName firstName');
        res.status(200).json(withdraws);
    } catch (error) {
        next(error);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Withdraws'];
    try {
        const withdraw = await Withdraw.findById(req.params.id).populate('memberId', 'familyName firstName');
        if (!withdraw) return res.status(404).json({ message: 'Withdraw not found.' });
        res.status(200).json(withdraw);
    } catch (error) {
        next(error);
    }
};

const createWithdraw = async (req, res, next) => {
    //#swagger.tags=['Withdraws'];
    //#swagger.parameters['body'] = { in: 'body', schema: { $memberId: 'member id from GET /profile', $months: { '2025-11': 23000, '2025-12': 35000 } } };
    try {
        const withdraw = await Withdraw.create(req.body);
        res.status(201).json(withdraw);
    } catch (error) {
        next(error);
    }
};

const updateWithdraw = async (req, res, next) => {
    //#swagger.tags=['Withdraws'];
    //#swagger.parameters['body'] = { in: 'body', schema: { months: { '2025-11': 23000, '2025-12': 40000 } } };
    try {
        const withdraw = await Withdraw.findById(req.params.id);
        if (!withdraw) return res.status(404).json({ message: 'Withdraw not found.' });
        withdraw.set(req.body);
        await withdraw.save();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const deleteWithdraw = async (req, res, next) => {
    //#swagger.tags=['Withdraws'];
    try {
        const withdraw = await Withdraw.findByIdAndDelete(req.params.id);
        if (!withdraw) return res.status(404).json({ message: 'Withdraw not found.' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getByMember,
    getSingle,
    createWithdraw,
    updateWithdraw,
    deleteWithdraw
};
