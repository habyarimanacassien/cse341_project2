const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const app = express();

const port = process.env.PORT || 3000;

app.set('trust proxy', 1); // Render sits in front of the app, this keeps https working

app.use(bodyParser.json());
app.use((req, res, next) => {
    req.body = req.body || {}; // requests without a body get an empty object
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

// these two must stay after the routes
app.use(notFound);
app.use(errorHandler);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Server is running on port ${port}`)});
    }
});
