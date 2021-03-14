const express = require("express");
const mongoose = require("mongoose");
// const BodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();

// Import Router
const auth = require("./routes/auth");
const users = require("./routes/users");

// MongoDB Connection
mongoose.connect(
  process.env.CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Route Middleware
app.use("/auth", auth);
app.use("/users", users);

// Listening Port
const PORT = process.env.PORT || 3400;
app.listen(PORT, console.log("Server running on: " + PORT));
