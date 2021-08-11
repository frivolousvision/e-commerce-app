const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //1.
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not authorized No token");
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;
  } catch (err) {
    console.error("Error Message:" + err.message);
    return res.status(403).json("Not authorized Error");
  }
  next();
};
