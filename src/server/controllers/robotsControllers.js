const Robot = require("../../database/models/Robot");

const getAllRobots = async (req, res) => {
  const robots = await Robot.find();
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

const replaceRobot = async (req, res, next) => {
  try {
    const replacingRobot = await Robot.replaceOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: req.body._id },
      { ...req.body }
    );
    res.json(replacingRobot);
  } catch (error) {
    next(error);
  }
};

const deleteRobot = async (req, res, next) => {
  try {
    const robotId = req.params.id;
    await Robot.findByIdAndDelete(robotId);
    res.status(200);
    res.json({});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRobots,
  getRobot,
  createRobot,
  replaceRobot,
  deleteRobot,
};
