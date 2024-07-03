const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config()

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    if (!email || !password || !userName) {
      return res
        .status(400)
        .json({ message: 'This is not a valid body. Check your fields.' });
    }

    const exists = await userModel.findOne({ email: email });

    if (exists) {
      return res
        .status(400)
        .json({ message: "This email is already registered. Try to login." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new userModel({ email, userName, password: hashedPassword });
    await user.save();
    return res
      .status(201)
      .json({ message: "User is registered successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "This is not a valid body. Check your fields." });
    }

    const exists = await userModel.findOne({ email: email });
    if (!exists) {
      return res
        .status(400)
        .json({ message: "This email is not registered. Try to register." });
    }

    const result = await bcrypt.compare(password, exists.password);

    if (result) {
      const token = jwt.sign(
        { email: exists.email, userName: exists.userName },
        process.env.JWT_SECRET,
      );
      req.session.token = token
      return res.status(200).json({ accessToken: token });
    } else {
      return res
        .status(400)
        .json({ message: "User details are not correct. Check your details." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = userRouter;
