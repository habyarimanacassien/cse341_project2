const express = require('express');
const router = express.Router();

const controller = require('../controllers/loans');
const validateId = require('../middleware/validateId');

router.get('/', controller.getAll);

router.get('/member/:memberId', validateId, controller.getByMember);

router.get('/:id', validateId, controller.getSingle);

router.post('/', controller.createLoan);

router.put('/:id', validateId, controller.updateLoan);

router.delete('/:id', validateId, controller.deleteLoan);

module.exports = router;