const express = require("express");
const router = express.Router();

const db = require("../index.js");
const { userTable } = require("../schema/user.model.js");

const { eq } = require("drizzle-orm");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { hashedPass } = require("../utils/hash.js");
const { existingUser } = require("../services/user.services.js");

const { signupPostValidation } = require("../validation/request.validation.js");
const { loginPostValidation } = require("../validation/login.validation.js");



router.post("/signup", async (req, res) => {
  try {
    const inputValid = await signupPostValidation.safeParseAsync(req.body);

    if (!inputValid.success) {
      return res.status(400).json({
        error: inputValid.error.errors[0].message,
      });
    }

    const { name, email, password } = inputValid.data;

    const userAlreadyExists = await existingUser(email);

    if (userAlreadyExists) {
      return res.status(409).json({
        error: "Email already registered.",
      });
    }

    const hashedPassword = await hashedPass(password);

    const [user] = await db
      .insert(userTable)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    return res.status(201).json({
      success: "Account created successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});



router.post("/login", async (req, res) => {
  try {
    const validLogin = await loginPostValidation.safeParseAsync(req.body);

    if (!validLogin.success) {
      return res.status(400).json({
        error: validLogin.error.errors[0].message,
      });
    }

    const { email, password } = validLogin.data;

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: `Welcome back, ${user.name}!`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;