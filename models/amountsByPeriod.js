// A field that holds many amounts
module.exports = (keyPattern, example) => ({
    type: Map,
    of: { type: Number, min: [0, 'amount cannot be negative'] },
    required: true,
    validate: {
        validator: (amounts) => [...amounts.keys()].every((key) => keyPattern.test(key)),
        message: `keys must look like ${example}`
    }
});