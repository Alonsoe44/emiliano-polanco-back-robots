require("dotenv").config();
const debug = require("debug")("robots-app:root");
const connectRobotArmyDataBase = require("./database");
const serverUp = require("./server");

const serverPort = process.env.PORT;
const loginConectionCredentials = process.env.LOGIN_CREDENTIALS;

(async () => {
  try {
    await connectRobotArmyDataBase(loginConectionCredentials);
    await serverUp(serverPort);
  } catch (error) {
    debug(`The server it's broken`);
  }
})();

debug(serverPort);
