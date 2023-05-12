const { Router } = require('express');

const favController = require('../controllers/favourites');
const authenticator = require("../middleware/authenticator");

const favRouter = Router();

favRouter.get("/", authenticator, favController.getData); //remove this?
favRouter.get("/:id", authenticator, favController.getFavouriteById);
favRouter.get("/user/:id", authenticator, favController.getFavouritesByUser);
favRouter.get("/fav/:id", authenticator, favController.getFavIdFromPointId);
favRouter.post("/", authenticator, favController.addFavourite);
favRouter.delete("/:id", authenticator, favController.destroy);



module.exports = favRouter;
