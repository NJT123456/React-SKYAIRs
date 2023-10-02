const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { Schedules, Tickets, sequelize } = require("../models");

router.get("/", validateToken, async (req, res) => {
  const schedulesWithTickets = await Schedules.findAll({
    include: [
      {
        model: Tickets,
        as: "flight",
        where: { id: sequelize.col("Schedules.flight_id") },
      },
    ],
  });

  res.json(schedulesWithTickets);
});

module.exports = router;
