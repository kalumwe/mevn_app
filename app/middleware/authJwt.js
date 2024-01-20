const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
}; 
 
const checkRole = (req, res, next, requiredRole) => {
  User.findById(req.userId).exec()
  .then((user) => {
    //Retrieves the roles associated with the user from the Role collection.
    Role.find(
      {
        _id: { $in: user.roles }
      })
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === requiredRole) {
            next();
            return;
          }
        }

        res.status(403).send({ message: `Require ${requiredRole} Role!` });
        return;
      })
      .catch(err => {
        res.status(500).send({ message: err });
        return;
      });
  })
  .catch( err => {
    res.status(500).send({ message: err });
    return;
  });
  };
  
  isAdmin = (req, res, next) => {
    checkRole(req, res, next, 'admin');
  };
  
  isModerator = (req, res, next) => {
    checkRole(req, res, next, 'moderator');
  };


const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};


module.exports = authJwt;