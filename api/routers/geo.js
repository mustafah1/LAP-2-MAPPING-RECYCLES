const { Router } = require('express');

const geoController = require('../controllers/geo');

const geoRouter = Router();

geoRouter.get("/", geoController.getData);


module.exports = geoRouter;