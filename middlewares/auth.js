import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/config.jwt.js";

import { User } from "../models/index.js";

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const userObj = await User.findOne({
    where: { email: email }
  });

  const isUserAuthenticated = bcrypt.compareSync(password, userObj.password);

  if (isUserAuthenticated) {
    let token = jwt.sign({ email: email }, config.secret, {
      expiresIn: "24h" // expires in 24 hours
    });

    // return the JWT token for the future API calls
    res.send({
      success: true,
      message: "successful auth",
      token: token,
      user: userObj
    });
  } else {
    res.status(403).send({
      success: false,
      message: "Incorrect username or password"
    });
  }
};

module.exports = {
  checkToken: checkToken,
  login: login
};
