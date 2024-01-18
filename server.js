const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kalu application." });
});

const db = require("./app/models");

const Role = db.role;

db.mongoose
//.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  .connect(db.url, {})
  .then(() => {
    console.log("Connected to MongoDB database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  function initial() {
  Role.estimatedDocumentCount().then((count, err) => {
    if (!err && count === 0) {
      
      new Role({
        name: "user"
      }).save().then( data => {
        if (data) {
          console.log("data", data);
        }

        console.log("added 'user' to roles collection");
      })
      .catch((err) => {
        console.error(err);
      });

      new Role({
        name: "moderator"
      }).save().then( data => {
        if (data) {
          console.log("data", data);
        }

        console.log("added 'moderator' to roles collection");
      })
      .catch((err) => {
        console.error(err);
      });

      new Role({
        name: "admin"
      }).save().then( data => {
        if (data) {
          console.log("data", data);
        }

        console.log("added 'admin' to roles collection");
      })
      .catch((err) => {
        console.error(err);
      });
    }
   })
   .catch((err) => {
     console.error(err);
   });
  }

  require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.set('port', (process.env.PORT || 3000));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});