const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

  // Username
  User.findOne({
    username: req.body.username
  }).exec()
  .then((user) => {
    if (user) {
      res.status(400).send("Failed! Username is already in use!");
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec()
    .then((user) => {
      if (user) {
        res.status(400).send("Failed! Email is already in use!");
        return;
      }

      next();
    })
    .catch( err => {
      res.status(500).send({ message: err });
        return;
    });

  })
  .catch(err => {
    res.status(500).send({ message: err });
    return;
  });
};

//check if roles exist in roles array
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;