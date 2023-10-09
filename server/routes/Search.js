const express = require("express");
const router = express.Router();
const { Tickets, Locations } = require("../models");

router.get("/", async (req, res) => {
  const { depAirport, arrAirport, seatClass, depDate, retDate, type } =
    req.query;

    const originLocations = await Locations.findAll({
      where: { code: depAirport },
    });
    const destinationLocations = await Locations.findAll({
      where: { code: arrAirport },
    });
  
    const originLocationIds = originLocations.map((location) => location.id);
    const destinationLocationIds = destinationLocations.map((location) => location.id);

  let search;
  if (type === "return") {
    search = await Tickets.findAll({
      where: {
        origin_id: destinationLocationIds,
        destination_id: originLocationIds,
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

    if (search.length === 0) {
      res.json({ msg: "There is no information on the return flight." });
    } else {
      res.json(search);
    }
  } else {
    search = await Tickets.findAll({
      where: {
        origin_id: originLocationIds,
        destination_id: destinationLocationIds,
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
    if (search.length === 0) {
      res.json({ msg: "There is no information on the departure flight." });
    } else {
      res.json(search);
    }
  }
});

module.exports = router;
