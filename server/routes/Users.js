const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddlewares");

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
    return;
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong Username And Password Combination" });
      return; // ออกจากการทำงานทันทีหลังจากส่งข้อความข้อผิดพลาด
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get('/auth', validateToken, (req, res) =>{
  res.json(req.user)
})

module.exports = router;
