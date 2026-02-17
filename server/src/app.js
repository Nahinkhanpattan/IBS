const express = require("express");
const cors = require("cors");
const deviceRoutes = require("./routes/deviceRoutes");
const accessRoutes = require("./routes/accessRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/devices", deviceRoutes);
app.use("/api/access", accessRoutes);

module.exports = app;
