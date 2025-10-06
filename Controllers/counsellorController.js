const User = require("../Models/Users.js");

const getAllCounsellors = async (req, res) => {
  try {
    const counellors = await User.find({ role: "counsellor" });
    res.json(counellors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCounsellor = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteCounsellor = await User.findByIdAndDelete(id);
    if (!deleteCounsellor) {
      return res
        .status(404)
        .json({ status: false, message: "Counsellor not found." });
    }
    res.json(deleteCounsellor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { deleteCounsellor, getAllCounsellors };
