const express = require("express");
const cors = require("cors");

const accessRoutes = require("./routes/accessRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/access", accessRoutes);

module.exports = app;
