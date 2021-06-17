// get the web token
const jwt = require('jsonwebtoken');

// get token for authorization header, take token and run it through method in JWT
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secret');
    // send back into user data, token is going back into the session
    req.userData = decoded;
    next();
  } catch(error) {
      return res.status(401).json({
        message: 'Authorization failed'
      });
  }
};