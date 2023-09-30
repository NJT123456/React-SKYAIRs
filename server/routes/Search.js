const express = require("express");
const router = express.Router();
const { Tickets, Locations } = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddlewares");

router.get("/", async (req, res) => {
  const { origin, destination, seat_class, dep_date, ret_date, type } =
    req.query;
  const originLocations = await Locations.findAll({
    where: { code: { [Op.or]: [origin, destination] } },
  });

  const originLocationIds = originLocations.map((location) => location.id);

  let search;
  if (type === "return") {
    search = await Tickets.findAll({
      where: {
        origin_id: { [Op.in]: originLocationIds },
        destination_id: { [Op.in]: originLocationIds },
        seat_class: seat_class,
        depart_date: ret_date,
      },
      include: [
        {
          model: Locations,
          as: "origin",
        },
        {
          model: Locations,
          as: "destination",
        },
      ],
    });
  } else {
    search = await Tickets.findAll({
      where: {
        origin_id: { [Op.in]: originLocationIds },
        destination_id: { [Op.in]: originLocationIds },
        seat_class: seat_class,
        depart_date: dep_date,
      },
      include: [
        {
          model: Locations,
          as: "origin",
        },
        {
          model: Locations,
          as: "destination",
        },
      ],
    });
  }

  if (search.length === 0) {
    res.json({ msg: "No flights found for Date." });
  } else {
    res.json(search);
  }
});

// todo: select
router.get("/select", validateToken, async (req, res) => {
  const { flightnumber_book } = req.body;
  const ticket = Tickets.fineOne({
    where: { fnumber: flightnumber_book },
  });
  res.json(ticket)
});

module.exports = router;
