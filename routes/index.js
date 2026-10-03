const router = require('express').Router();
<<<<<<< HEAD
const isAuthenticated = require('../middleware/authenticate');

router.use('/', require('./swagger'));
router.use('/', require('./auth'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World'];
    res.send(req.isAuthenticated()
        ? `Caisse d'Entraide API. Logged in as ${req.user.username}`
        : "Caisse d'Entraide API. Logged out. Open /login to sign in");
});

router.use('/profile', isAuthenticated, require('./profile'));
router.use('/loans', isAuthenticated, require('./loans'));
router.use('/interest', isAuthenticated, require('./interest'));
router.use('/savings', isAuthenticated, require('./savings'));
router.use('/withdraws', isAuthenticated, require('./withdraws'));

module.exports = router;
=======

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World'];
    res.send("Caisse d'Entraide API");
});

router.use('/profile', require('./profile'));
router.use('/loans', require('./loans'));
router.use('/interest', require('./interest'));
router.use('/savings', require('./savings'));
router.use('/withdraws', require('./withdraws'));

module.exports = router;
>>>>>>> ed1362fee85a5422402f6169b89962c07f12bf7f
