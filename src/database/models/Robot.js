const { model, Schema } = require("mongoose");

const RobotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  statistics: {
    velocity: {
      type: Number,
      max: 10,
      min: 0,
    },
    endurance: {
      type: Number,
      max: 10,
      min: 0,
    },
    creationDate: Number,
  },
});

const Robot = model("Robot", RobotSchema, "RobotArmy");

module.exports = Robot;
