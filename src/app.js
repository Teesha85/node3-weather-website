const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forcast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

//List of handlers below:

//using the handlebar file index.hbs
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Leticia Allain",
  });
});

//using the handlebar file for about.hbs
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Leticia Allain",
  });
});

//using the handlebar file for help.hbs
app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "Hello! How can I help you today?",
    title: "Help Page",
    name: "Leticia Allain",
  });
});

//not using handlebar for this endpoint.
app.get("/weather", (req, res) => {
  //if no address query provided return error message

  if (!req.query.address) {
    return res.send({ error: "Please enter in a valid address" });
  }
  geocode(
    req.query.address,
    //error string, {data object destructured to individual properties}
    //if error occurs, send back error message
    //Added default parameters '{ latitude, longitude, location } = {}'
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      //if geocode is valid run forcast data
      // if forcast gives error send error message.
      forecast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({ error });
        }
        //respond with forcast, location, and adress entered
        res.send({
          forcast: forcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

//product handler
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Please enter in a search" });
  }
  res.send({
    product: [],
  });
});

// handler for 404 pages that deal with help articles.
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error Page",
    name: "Leticia Allain",
    errorMessage: "Help Article Not Found",
  });
});

// * is a wilde card that means everything else that is not listed above.
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error Page",
    name: "Leticia Allain",
    errorMessage: "Page Not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
