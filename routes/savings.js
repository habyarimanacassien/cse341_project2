const express = require('express');
const router = express.Router();

const controller = require('../controllers/savings');
const validateId = require('../middleware/validateId');

router.get('/', controller.getAll);

router.get('/member/:memberId', validateId, controller.getByMember);

router.get('/:id', validateId, controller.getSingle);

router.post('/', controller.createSaving);

router.put('/:id', validateId, controller.updateSaving);

router.delete('/:id', validateId, controller.deleteSaving);

module.exports = router;
