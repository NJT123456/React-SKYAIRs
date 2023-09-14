const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password, password1 } = req.body;

  // ตรวจสอบว่า username นี้มีอยู่แล้ว
  const existingUser = await Users.findOne({ where: { username: username } });

  if (existingUser) {
    return res.json({ error: "Username already exists" });
  }

  // ตรวจสอบว่ารหัสผ่านและรหัสผ่านยืนยันตรงกัน
  if (password !== password1) {
    return res.json({ error: "Passwords do not match" });
  }

  // ถ้ารหัสผ่านตรงกัน
  bcrypt.hash(password, 10).then(async (hash) => {
    await Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

module.exports = router;
