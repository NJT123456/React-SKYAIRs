const express = require("express");
const router = express.Router();
const { Tickets, Locations } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const { origin, destination, seat_class, dep_date, ret_date, type } =
    req.query;
  const originLocations = await Locations.findAll({
    where: { code: { [Op.or]: [origin, destination] } },
  });

  const originLocationIds = originLocations.map((location) => location.id);

  if (type === "return") {
    const search = await Tickets.findAll({
      where: {
        origin_id: { [Op.in]: originLocationIds },
        destination_id: { [Op.in]: originLocationIds },
        seat_class: seat_class,
        depart_date: ret_date,
      },
    });

    res.json({
      listOfSearch: search,
    });
  } else {
    const search = await Tickets.findAll({
      where: {
        origin_id: { [Op.in]: originLocationIds },
        destination_id: { [Op.in]: originLocationIds },
        seat_class: seat_class,
        depart_date: dep_date,
      },
    });
    
    res.json({
      listOfSearch: search,
    });
  }
});

module.exports = router;
