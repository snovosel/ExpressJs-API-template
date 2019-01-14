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

const signToken = email => {
  let token = jwt.sign({ email: email }, config.secret, {
    expiresIn: "24h" // expires in 24 hours
  });

  return token;
};

module.exports = {
  checkToken: checkToken,
  signToken: signToken
};
