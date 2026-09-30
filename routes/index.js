const router = require('express').Router();

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