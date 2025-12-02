const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL;
const URL_LOCAL = "mongodb://localhost:27017/proyect-mern-stack";

mongoose
  .connect(URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established");
});

connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

module.exports = connection;
