const { Unauthenticated } = require("../CustomErrors");
const jwt = require("jsonwebtoken");

const authenticationMiddleWare = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Unauthenticated("Authentication failed");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      username: decoded.username,
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    throw new Unauthenticated("Authentication error");
  }
};

const getRoute = (req, res) => {
  res.send("Hello from auth route.");
};

module.exports = authenticationMiddleWare;
