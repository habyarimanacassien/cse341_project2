const Saving = require('../models/saving');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Savings'];
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const savings = await Saving.find().populate('memberId', 'familyName firstName');
        res.status(200).json(savings);
    } catch (error) {
        next(error);
    }
};

const getByMember = async (req, res, next) => {
    //#swagger.tags=['Savings'];
    //#swagger.description='Records of one member. Use the _id from GET /profile.';
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const savings = await Saving.find({ memberId: req.params.memberId }).populate('memberId', 'familyName firstName');
        res.status(200).json(savings);
    } catch (error) {
        next(error);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Savings'];
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const saving = await Saving.findById(req.params.id).populate('memberId', 'familyName firstName');
        if (!saving) return res.status(404).json({ message: 'Saving not found.' });
        res.status(200).json(saving);
    } catch (error) {
        next(error);
    }
};

const createSaving = async (req, res, next) => {
    //#swagger.tags=['Savings'];
    //#swagger.parameters['body'] = { in: 'body', schema: { $memberId: 'member id from GET /profile', $startUp: 1691000, $months: { '2025-11': 66000, '2025-12': 212000 } } };
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const saving = await Saving.create(req.body);
        res.status(201).json(saving);
    } catch (error) {
        next(error);
    }
};

const updateSaving = async (req, res, next) => {
    //#swagger.tags=['Savings'];
    //#swagger.parameters['body'] = { in: 'body', schema: { startUp: 1691000, months: { '2025-11': 66000, '2025-12': 212000, '2026-01': 38000 } } };
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const saving = await Saving.findById(req.params.id);
        if (!saving) return res.status(404).json({ message: 'Saving not found.' });
        saving.set(req.body);
        await saving.save();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const deleteSaving = async (req, res, next) => {
    //#swagger.tags=['Savings'];
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const saving = await Saving.findByIdAndDelete(req.params.id);
        if (!saving) return res.status(404).json({ message: 'Saving not found.' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getByMember,
    getSingle,
    createSaving,
    updateSaving,
    deleteSaving
};
