const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { Passengers, Users, Schedules } = require("../models");

router.post("/", validateToken, async (req, res) => {
  const { fn, ln, email, tel, gender, selectFormData } = req.body;

  const user = await Users.findOne({ where: { username: req.user.username } });

  //* Update the user's information in the Users table
  if (fn) user.first_name = fn;
  if (ln) user.last_name = ln;
  if (email) user.email = email;
  if (tel) user.phone = tel;
  await user.save();

  //* Create a new entry in the Passengers table

  const existingPassenger = await Passengers.findOne({
    where: { UserId: user.id },
  });

  if (existingPassenger) {
    // If there is existing data, update it
    existingPassenger.first_name = user.first_name;
    existingPassenger.last_name = user.last_name;
    existingPassenger.gender = gender;
    await existingPassenger.save();
  } else {
    // If there is no existing data, create a new entry in the Passengers table
    await Passengers.create({
      first_name: user.first_name,
      last_name: user.last_name,
      gender: gender,
      UserId: user.id,
    });
  }

  // * Schedules
  let nextRefNo = "";
  let totalFare = 0;

  const lastSchedule = await Schedules.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (lastSchedule) {
    // หาเลขตัวสุดท้ายของ ref_no และเพิ่มขึ้น 1
    const lastRefNo = lastSchedule.ref_no;
    const lastRefNoNumber = parseInt(lastRefNo.slice(2));
    nextRefNo = `RP${(lastRefNoNumber + 1).toString().padStart(4, "0")}`;
  } else {
    // ถ้าไม่มีข้อมูลในตารางให้ใช้ค่าเริ่มต้น
    nextRefNo = "RP1000";
  }

  for (let i = 0; i < selectFormData.length; i++) {
    totalFare += selectFormData[i].fare;
  }

  await Schedules.create({
    ref_no: nextRefNo,
    flight_departdate: selectFormData[0].depart_date,
    flight_returndate: selectFormData[1] ? selectFormData[1].depart_date : null,
    flight_fare: selectFormData[0].fare,
    total_fare: totalFare,
    seat_class: selectFormData[0].seat_class,
    booking_date: new Date(),
    status: "PENDING",
    flight_id: selectFormData[0].id,
    UserId: user.id,
  });

  if (selectFormData.length > 1) {
    const lastSchedule = await Schedules.findOne({
      order: [["createdAt", "DESC"]],
    });
    if (lastSchedule) {
      // หาเลขตัวสุดท้ายของ ref_no และเพิ่มขึ้น 1
      const lastRefNo = lastSchedule.ref_no;
      const lastRefNoNumber = parseInt(lastRefNo.slice(2));
      nextRefNo = `RP${(lastRefNoNumber + 1).toString().padStart(4, "0")}`;
    } else {
      // ถ้าไม่มีข้อมูลในตารางให้ใช้ค่าเริ่มต้น
      nextRefNo = "RP1000";
    }
    await Schedules.create({
      ref_no: nextRefNo,
      flight_departdate: selectFormData[0].depart_date,
      flight_returndate: selectFormData[1]
        ? selectFormData[1].depart_date
        : null,
      flight_fare: selectFormData[1].fare,
      total_fare: totalFare,
      seat_class: selectFormData[1].seat_class,
      booking_date: new Date(),
      status: "PENDING",
      flight_id: selectFormData[1].id,
      UserId: user.id,
    });
  }

  res.json("create book");
});

module.exports = router;
