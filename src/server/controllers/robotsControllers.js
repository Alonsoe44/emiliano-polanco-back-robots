const Robot = require("../../database/models/Robot");

const getAllRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json({ robots });
};

const getRobot = async (req, res, next) => {
  const { id } = req.params;
  try {
    const robot = await Robot.findById(id);
    res.json(robot);
  } catch (error) {
    error.status = 404;
    error.message = "That robot is no in the database";
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robotCreation = await Robot.create(req.body);
    res.json(robotCreation);
  } catch (error) {
    error.status = 400;
    error.message = "You did a bad request , robot not created";
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
