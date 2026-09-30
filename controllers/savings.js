const Saving = require('../models/saving');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Savings'];
    try {
        const filter = req.query.memberId ? { memberId: req.query.memberId } : {};
        const savings = await Saving.find(filter).populate('memberId', 'familyName firstName');
        res.status(200).json(savings);
    } catch (error) {
        next(error);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Savings'];
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
    getSingle,
    createSaving,
    updateSaving,
    deleteSaving
};
