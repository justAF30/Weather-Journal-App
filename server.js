// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// body-parser
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

// Listen
const server = app.listen(port, listening);

// listening func
// Server checking message
function listening() {
  console.log("Server is running");
  console.log(`Running on localhost: ${port}`);
}

app.get("/all", sendData);

// callback sendData func
function sendData(request, response) {
  response.send(projectData);
}

// post request
app.post("/add", addData);

function addData(req, res) {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  projectData = newEntry;
}
