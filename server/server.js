import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

// Setting up express app
const app = express();
const PORT = process.env.PORT || "8000";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importing routes
import imagesRoutes from "./router/imagesRoute.js";

// Using routes
app.use("/images", imagesRoutes);

app.use("/inputs", express.static("inputs"));
app.use("/out", express.static("out"));

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
