require('dotenv').config();

const requiredVariables = ['MONGODB_URL', 'SESSION_SECRET', 'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'CALLBACK_URL'];
const missing = requiredVariables.filter((name) => !process.env[name]);
if (missing.length > 0) {
    console.log(`These variables are missing in .env (or in Render): ${missing.join(', ')}`);
    process.exit(1);
}

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const passport = require('passport');
const mongodb = require('./data/database');
const { notFound, errorHandler } = require('./middleware/errorHandler');
require('./config/passport');
const app = express();

const port = process.env.PORT || 3000;

app.set('trust proxy', 1); // Render sits in front of the app, this keeps https working

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }), // sessions are kept in MongoDB
    cookie: { secure: 'auto', httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
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
