// Importing required modules and packages
const express = require("express"); // Express framework for building web applications
const dotenv = require("dotenv"); // Dotenv for managing environment variables
const mongoose = require("mongoose"); // Mongoose for MongoDB object modeling
const morgan = require("morgan"); // Morgan for HTTP request logging

// Importing user routes
const userRoutes = require('./src/routes/user.Routes')

// Importing the connectDB function from the db configuration file
const { connectDB } = require("./src/config/db");

// Initializing the Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Loading environment variables from .env file
dotenv.config();

// Middleware for HTTP request logging in development mode
app.use(morgan("dev"));

// Setting the port for the server to listen on
const port = process.env.PORT || 3000;

// Handling GET requests to the root route
app.get("/", (req, res) => {
  res.send("Welcome To Our TODO LIST APP");
});

// Using user routes for endpoints starting with '/api/v1/user'
app.use('/api/v1/user', userRoutes)

// Handling 404 errors with a custom message
app.get("*", (req, res) => {
  res.status(404).json("page not found");
});

// Starting the server and connecting to the MongoDB database
app.listen(port, async () => {
  try {
    // Connecting to the MongoDB database using the connectDB function
    await connectDB(process.env.MONGODB_URL);
    console.log("Database connection established");
    console.log(`Server is listening on http://localhost:${port}`);
  } catch (error) {
    // Handling errors during database connection
    console.log("Error connecting to MongoDB: " + error.message);
  }
});
