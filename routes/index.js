const router = require('express').Router();
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
