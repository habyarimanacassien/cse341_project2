const mongoose = require('mongoose');

// Used by loans, interest, savings and withdraws to link a record to a member
module.exports = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: [true, 'memberId is required'],
    validate: {
        validator: async (id) => Boolean(await mongoose.model('Profile').exists({ _id: id })),
        message: 'memberId does not match any member in profile'
    }
};
