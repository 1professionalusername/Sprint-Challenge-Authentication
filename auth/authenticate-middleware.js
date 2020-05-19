/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const secret = require("../database/secret")

function restrict() {
  return async (req, res, next) => {
    const authError = {
      you: "shall not pass",
    };
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, secret, (err, decodedPayload) => {
        if (err) {
          return res.status(401).json(authError);
        }
        req.token = decodedPayload;
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;