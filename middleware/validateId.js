const mongoose = require('mongoose');

const validateId = (req, res, next) => {
    const id = req.params.id || req.params.memberId;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid id.' });
    }
    next();
};

module.exports = validateId;
