const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { Op } = require("sequelize");


// Registration API
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check uniqueness of email or username
    const data = await User.findAll();
    console.log(data,"+++++++++++");
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "User with this email or username already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ username, email, password: hashedPassword });

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login API
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
      console.log(email," +++++++++++ ", password);
  try {
    // Find by email (or allow login by username if needed)
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("No user")
      return res.status(400).json({ msg: "Invalid credentials" });
    }
      console.log("user ", user)

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
            console.log("No match")

      return res.status(400).json({ msg: "Invalid credentials" });
    }
      console.log("isMatch",  isMatch)

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
