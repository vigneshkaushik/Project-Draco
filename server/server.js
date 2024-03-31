// Importing express and other required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Setting up express app
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importing routes
const imagesRoutes = require("./router/imagesRoute");
const narrativeRoutes = require("./router/narrativeRoute");
const critiqueRoutes = require("./router/critiqueRoute");

// Using routes
app.use("/images", imagesRoutes);
app.use("/narrative", narrativeRoutes);
app.use("/critique", critiqueRoutes);

// Route for testing the express app
app.get("/", (req, res) => {
  res.status(200).json({
    title: "Express Testing",
    message: "The Express app is working properly!",
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
