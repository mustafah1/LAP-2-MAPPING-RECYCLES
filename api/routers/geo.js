const { Router } = require('express');

const geoController = require('../controllers/geo');

const geoRouter = Router();

geoRouter.get("/", geoController.getData);
geoRouter.get("/iddescr/", geoController.getIdDescr)


module.exports = geoRouter;