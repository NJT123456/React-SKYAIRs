const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const searchRouter = require("./routes/Search");
app.use("/search", searchRouter);

const confirmRouter = require("./routes/Confirm");
app.use("/confirm", confirmRouter);

const orderRouter = require("./routes/Order");
app.use("/order", orderRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Sever running on Port 3001");
  });
});
