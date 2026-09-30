const express = require('express');
const router = express.Router();

const controller = require('../controllers/profile');
const validateId = require('../middleware/validateId');

router.get('/', controller.getAll);

router.get('/:id', validateId, controller.getSingle);

router.post('/', controller.createProfile);

router.put('/:id', validateId, controller.updateProfile);

router.delete('/:id', validateId, controller.deleteProfile);

module.exports = router;