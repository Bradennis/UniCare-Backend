const asyncWrapper = require("../MiddleWare/async");
const { BadRequest, Unauthenticated } = require("../CustomErrors");
const studentSchema = require("../Models/studentsApi");
const Users = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = asyncWrapper(async (req, res) => {
  const { username, password, email, student_id, status } = req.body;

  if (!username || !password || !email || !student_id) {
    throw new BadRequest("Please fill all the fields");
  }

  const findStudent = await studentSchema.findOne({ id: student_id });

  if (!findStudent) {
    throw new Unauthenticated(
      "Only students with valid credentials can access this service"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Users.create({
    username,
    password: hashedPassword,
    email,
    student_id,
    role: status,
  });

  const token = user.createJwt();
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    username: user.username,
    student_id: user.student_id,
    _id: user._id,
  });
});

const login = asyncWrapper(async (req, res) => {
  const { password, student_id } = req.body;

  if (!password || !student_id) {
    throw new BadRequest("Please fill all the fields");
  }

  const user = await Users.findOne({ student_id });

  if (!user) {
    throw new Unauthenticated("Invalid credentials");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Unauthenticated("Invalid credentials");
  }

  const token = user.createJwt();
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    username: user.username,
    student_id: user.student_id,
    _id: user._id,
  });
});

const logOut = asyncWrapper(async (req, res) => {
  res.clearCookie("token");

  const { _id } = req.body;

  try {
    await Users.findByIdAndUpdate(
      _id,
      {
        online: false,
        lastSeen: new Date(),
        hasLoggedOut: true,
      },
      { new: true }
    );
  } catch (err) {
    console.error("Error updating last seen status:", err);
  }

  res.status(200).json({ msg: "Logged out successfully" });
});

const fetchToken = asyncWrapper(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Unauthenticated("Authentication failed");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Users.findOne({ username: decoded.username });

  if (!user) {
    throw new Unauthenticated("Authentication failed");
  }

  res.status(200).json({ token });
});

const testing = asyncWrapper(async (req, res) => {
  res.status(200).send("Hello world");
});

module.exports = { register, login, fetchToken, logOut, testing };
