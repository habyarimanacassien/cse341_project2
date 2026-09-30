const notFound = (req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
    // a validation rule from the model was broken
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => {
            const field = e.path.replace('.$*', '');
            return { field, message: e.name === 'CastError' ? `${field} has an invalid value` : e.message };
        });
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    // a value has the wrong type, for example ?memberId=abc
    if (err.name === 'CastError') {
        return res.status(400).json({ message: `Invalid value for "${err.path}"` });
    }

    // duplicate value in a unique field
    if (err.code === 11000) {
        return res.status(409).json({ message: 'This record already exists.' });
    }

    // the request body is not valid JSON
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Request body is not valid JSON.' });
    }

    console.error(err);
    res.status(500).json({ message: 'Something went wrong on the server.' });
};

module.exports = { notFound, errorHandler };