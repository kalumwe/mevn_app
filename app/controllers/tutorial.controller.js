const db = require("../models");

const Tutorial = db.tutorials;


const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    } 
    
    // Create a collection
    const tutorial = new Tutorial({
       title: req.body.title,
       description: req.body.description,
       published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database
    tutorial
      .save(tutorial)
        .then(data => {
           res.send(data);
        })
        .catch(err => {
           res.status(500).send({
               message:
               err.message || "Some error occurred while creating collection."
           });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  const title = req.query.title;
    //Constructs a MongoDB query condition to perform a case-insensitive search ($options: "i") based on the title field.
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const { limit, offset } = getPagination(page, size);

    Tutorial.paginate(condition, { offset, limit })
      .then((data) => {
        if (!data)
           res.status(404).send({ message: "Not found any Documents! with id " + id });
        else 
           res.send({
              totalItems: data.totalDocs,
              documents: data.docs,
              totalPages: data.totalPages,
              currentPage: data.page - 1,
        });
      })
      .catch(err => {
        res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving documents."
        });
    });

  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    //Retrieves the value of a route parameter named id.
    const id = req.params.id;

    Tutorial.findById(id)
      .then(data => {
        if (!data)
           res.status(404).send({ message: "Not found Document with id " + id });
        else res.send(data);
      })
      .catch(err => {
      res.status(500)
         .send({ message: "Error retrieving Document with id=" + id });
      });
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update documentl with id=${id} or document was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });

};

// Delete a document with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete document with id=${id} or document was not found!`
        });
      } else {
        res.send({
          message: "Document was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete document with id=" + id
      });
    });
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
      .then(data => {
        res.send({
           message: `${data.deletedCount} documents were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
           err.message || "Some error occurred while removing all documents."
        });
    });
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  const searchString = req.query.q
  
    Tutorial.paginate({ published: true }, { offset, limit })
      .then((data) => {
        res.send({
           totalItems: data.totalDocs,
           documents: data.docs,
           totalPages: data.totalPages,
           currentPage: data.page - 1,
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
           err.message || "Some error occurred while retrieving documents."
        });
    });
  
};


