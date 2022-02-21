const loginRouter = require("express").Router();
const userController = require("../controllers/usersControllers");

loginRouter.post("/", userController);

module.exports = loginRouter;
