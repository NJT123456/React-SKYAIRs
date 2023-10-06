const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddlewares");
const {
  Schedules,
  Tickets,
  sequelize,
  Locations,
  Passengers,
  Users,
} = require("../models");
const pdf = require("html-pdf");
const path = require("path");

const pdfTemplate = require("../documents/pdf");
const { route } = require("./Users");

router.get("/", validateToken, async (req, res) => {
  const schedulesWithTickets = await Schedules.findAll({
    include: [
      {
        model: Tickets,
        as: "flight",
        where: { id: sequelize.col("Schedules.flight_id") },
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
      },
    ],
  });

  res.json(schedulesWithTickets);
});

router.post("/updateStatus", validateToken, async (req, res) => {
  const { status, ref_no } = req.body;
  if (status === "Cancel") {
    await Schedules.update(
      { status: "CANCELLED" },
      { where: { ref_no: ref_no } }
    );

    res.json("Update Success");
  }

  if (status === "e - Ticket") {
    const SchedulesResult = await Schedules.findOne({
      include: [
        {
          model: Tickets,
          as: "flight",
          where: { id: sequelize.col("Schedules.flight_id") },
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
        },
        {
          model: Passengers,
          as: "passenger",
          where: { id: sequelize.col("Schedules.UserId") },
          include: [
            {
              model: Users,
              as: "user",
              attributes: { exclude: ["password"] },
            },
          ],
        },
      ],
    });

    res.json(SchedulesResult);
  }
});

router.post("/createPdf", (req, res) => {
  const pdfContent = pdfTemplate(req.body, {});

  pdf.create(pdfContent).toFile("order.pdf", (err) => {
    if (err) {
      console.log(err);
    }

    res.json("pdf generated");
  });
});

router.get("/fetchPdf", (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), `order.pdf`));
});

module.exports = router;
