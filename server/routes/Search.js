const express = require("express");
const router = express.Router();
const { Tickets, Locations } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const { depAirport, arrAirport, seatClass, depDate, retDate, type } =
    req.query;
  const originLocations = await Locations.findAll({
    where: { code: { [Op.or]: [depAirport, arrAirport] } },
  });

  const originLocationIds = originLocations.map((location) => location.id);

  let search;
  if (type === "return") {
    search = await Tickets.findAll({
      where: {
        origin_id: { [Op.in]: originLocationIds },
        destination_id: { [Op.in]: originLocationIds },
        seat_class: seatClass,
        depart_date: retDate,
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
        seat_class: seatClass,
        depart_date: depDate,
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

module.exports = router;
