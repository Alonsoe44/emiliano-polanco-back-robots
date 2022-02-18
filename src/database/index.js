const { default: mongoose } = require("mongoose");
const debug = require("debug")("robots-app:database");

const connectRobotArmyDataBase = (connectionLogin) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionLogin, (error) => {
      if (error) {
        reject(error);
        return;
      }
      debug("Database connected");
      resolve();
    });
  });

module.exports = connectRobotArmyDataBase;
