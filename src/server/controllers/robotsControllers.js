const debug = require("debug")("robots-app:controller");
const Robot = require("../../database/models/Robot");

const getAllRobots = async (req, res) => {
  const robots = await Robot.find();
  debug("The request is in the controller");
  res.json({ robots });
};

const getRobot = async (req, res, next) => {
  const { id } = req.params;
  try {
    const robot = await Robot.findById(id);
    if (robot) {
      res.json(robot);
    } else {
      const error = new Error("Robot not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robotCreation = await Robot.create(req.body);
    res.json(robotCreation);
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getAllRobots,
  getRobot,
  createRobot,
};
