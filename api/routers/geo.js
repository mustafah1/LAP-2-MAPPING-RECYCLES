const { Router } = require('express');

const geoController = require('../controllers/geo');
const authenticator = require("../middleware/authenticator");

const geoRouter = Router();

geoRouter.get("/", authenticator, geoController.getData);
geoRouter.get("/iddescr/", authenticator, geoController.getIdDescr)


module.exports = geoRouter;
