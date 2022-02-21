const jsonwebtoken = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  const headerAuth = req.header("Authorization");
  if (!headerAuth) {
    const error = new Error("Token missing");
    error.status = 401;
    next(error);
  } else {
    const token = headerAuth.replace("Bearer ", "");
    try {
      res.set("Access-Control-Allow-Origin", "*");
      jsonwebtoken.verify(token, process.env.SECRET_HEHE);
      next();
    } catch (error) {
      error.status = 401;
      next(error);
    }
  }
};

module.exports = { tokenValidator };
