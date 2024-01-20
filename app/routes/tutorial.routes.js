const { authJwt } = require("../middleware");
const tutorials = require("../controllers/tutorial.controller.js");

  module.exports = function(app) {

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    }); 

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], tutorials.create); 

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", [authJwt.verifyToken, authJwt.isAdmin], tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], tutorials.update); 

  // Delete a Tutorial with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], tutorials.delete);

  // Delete all Tutorials
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], tutorials.deleteAll);


  app.use('/api/tutorials', router);
};