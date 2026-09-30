const express = require('express');
const router = express.Router();

const controller = require('../controllers/withdraws');
const validateId = require('../middleware/validateId');

router.get('/', controller.getAll);

router.get('/member/:memberId', validateId, controller.getByMember);

router.get('/:id', validateId, controller.getSingle);

router.post('/', controller.createWithdraw);

router.put('/:id', validateId, controller.updateWithdraw);

router.delete('/:id', validateId, controller.deleteWithdraw);

module.exports = router;
