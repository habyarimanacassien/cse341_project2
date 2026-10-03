const Profile = require('../models/profile');
const Loan = require('../models/loan');
const Interest = require('../models/interest');
const Saving = require('../models/saving');
const Withdraw = require('../models/withdraw');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Profile'];
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const members = await Profile.find();
        res.status(200).json(members);
    } catch (error) {
        next(error);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Profile'];
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const member = await Profile.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found.' });
        res.status(200).json(member);
    } catch (error) {
        next(error);
    }
};

const createProfile = async (req, res, next) => {
    //#swagger.tags=['Profile'];
    //#swagger.parameters['body'] = { in: 'body', schema: { $familyName: 'MUHIRE', $firstName: 'Annonciathe', $email: 'annonciathe@example.com', $phoneNumber: '+250788123456', $nationalID: '1199580012345678', $address: 'Kigali', $memberSince: 2025 } };
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const member = await Profile.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    //#swagger.tags=['Profile'];
    //#swagger.parameters['body'] = { in: 'body', schema: { address: 'West', phoneNumber: '+250788123456' } };
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const member = await Profile.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found.' });
        member.set(req.body);
        await member.save();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const deleteProfile = async (req, res, next) => {
    //#swagger.tags=['Profile'];
    //#swagger.responses[401] = { description: 'You must log in first' };
    try {
        const member = await Profile.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found.' });

        // a member who still has records cannot be deleted
        const hasRecords = await Promise.all(
            [Loan, Interest, Saving, Withdraw].map((Model) => Model.exists({ memberId: req.params.id }))
        );
        if (hasRecords.some(Boolean)) {
            return res.status(409).json({ message: 'This member still has records. Delete them first.' });
        }
        await member.deleteOne();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getSingle,
    createProfile,
    updateProfile,
    deleteProfile
};
