const express = require("express");
const {
  getAllRobots,
  getRobot,
  createRobot,
} = require("../controllers/robotsControllers");

const robotsRouter = express.Router();

robotsRouter.get("/", getAllRobots);
robotsRouter.get("/:id", getRobot);

robotsRouter.post("/create", createRobot);

module.exports = robotsRouter;
