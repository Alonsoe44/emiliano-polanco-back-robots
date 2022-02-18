const express = require("express");
const {
  getAllRobots,
  getRobot,
  createRobot,
  replaceRobot,
  deleteRobot,
} = require("../controllers/robotsControllers");

const robotsRouter = express.Router();

robotsRouter.get("/", getAllRobots);
robotsRouter.get("/:id", getRobot);

robotsRouter.post("/create", createRobot);
robotsRouter.put("/update/:id", replaceRobot);
robotsRouter.delete("/delete/:id", deleteRobot);

module.exports = robotsRouter;
