const Interest = require('../models/interest');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Interest'];
    try {
        const filter = req.query.memberId ? { memberId: req.query.memberId } : {};
        const interest = await Interest.find(filter).populate('memberId', 'familyName firstName');
        res.status(200).json(interest);
    } catch (error) {
        next(error);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Interest'];
    try {
        const interest = await Interest.findById(req.params.id).populate('memberId', 'familyName firstName');
        if (!interest) return res.status(404).json({ message: 'Interest not found.' });
        res.status(200).json(interest);
    } catch (error) {
        next(error);
    }
};

const createInterest = async (req, res, next) => {
    //#swagger.tags=['Interest'];
    //#swagger.parameters['body'] = { in: 'body', schema: { $memberId: 'member id from GET /profile', $years: { '2025': 155000, '2026': 192000 } } };
    try {
        const interest = await Interest.create(req.body);
        res.status(201).json(interest);
    } catch (error) {
        next(error);
    }
};

const updateInterest = async (req, res, next) => {
    //#swagger.tags=['Interest'];
    //#swagger.parameters['body'] = { in: 'body', schema: { years: { '2025': 155000, '2026': 200000 } } };
    try {
        const interest = await Interest.findById(req.params.id);
        if (!interest) return res.status(404).json({ message: 'Interest not found.' });
        interest.set(req.body);
        await interest.save();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const deleteInterest = async (req, res, next) => {
    //#swagger.tags=['Interest'];
    try {
        const interest = await Interest.findByIdAndDelete(req.params.id);
        if (!interest) return res.status(404).json({ message: 'Interest not found.' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getSingle,
    createInterest,
    updateInterest,
    deleteInterest
};
