// Importing express and other required modules
const express = require("express");
const cors = require("cors");

// Setting up express app
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

// Importing routes
const imagesRoutes = require("./router/imagesRoute");

// Using routes
app.use("/images", imagesRoutes);

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
