const express = require("express");
const {
  getAllRobots,
  getRobot,
  createRobot,
  replaceRobot,
  deleteRobot,
} = require("../controllers/robotsControllers");
const { tokenValidator } = require("../middlewares/tokenValidator");

const robotsRouter = express.Router();

robotsRouter.get("/", getAllRobots);
robotsRouter.get("/:id", getRobot);

robotsRouter.post("/create", tokenValidator, createRobot);
robotsRouter.put("/update/:id", tokenValidator, replaceRobot);
robotsRouter.delete("/delete/:id", tokenValidator, deleteRobot);

module.exports = robotsRouter;
