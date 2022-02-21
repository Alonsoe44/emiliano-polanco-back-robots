const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const userController = async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    const error = new Error("User not found");
    error.status = 401;
    next(error);
  } else {
    const userData = {
      userName,
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
    };
    const passwordValidation = await bcrypt.compare(password, user.password);

    if (passwordValidation) {
      const token = jsonwebtoken.sign(userData, process.env.SECRET_HEHE);
      res.json({ token });
    } else {
      const error = new Error();
      next(error);
    }
  }
};

module.exports = userController;
