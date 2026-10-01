const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

// The docs page uses the address it was opened from (localhost or Render)
router.use('/api-docs', (req, res, next) => {
    swaggerFile.host = req.get('host');
    swaggerFile.schemes = [req.protocol];
    req.swaggerDoc = swaggerFile;
    next();
}, swaggerUi.serveFiles(swaggerFile), swaggerUi.setup());

module.exports = router;
