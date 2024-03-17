const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["token"];
  jwt.verify(token, "SecretKey123456789", function (err, decoded) {
    if (err) {
      res.status(401).json({ status: "unauthorize" });
    } else {
      let email = decoded["data"];

      req.headers.email = email;
      next();
    }
  });
};
