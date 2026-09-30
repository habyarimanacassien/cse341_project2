const express = require('express');
const router = express.Router();

const controller = require('../controllers/interest');
const validateId = require('../middleware/validateId');

router.get('/', controller.getAll);

router.get('/member/:memberId', validateId, controller.getByMember);

router.get('/:id', validateId, controller.getSingle);

router.post('/', controller.createInterest);

router.put('/:id', validateId, controller.updateInterest);

router.delete('/:id', validateId, controller.deleteInterest);

module.exports = router;