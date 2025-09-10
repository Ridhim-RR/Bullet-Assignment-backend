const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/database");
const authRoutes = require("./routes/authRoutes/index");
const mediaRoutes = require("./routes/mediaRoutes/index");

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    require("./models/User");
    require("./models/Media");
    require("./models/Episode");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Failed to synchronize database:", error);
  }
})();

app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);

// --- Port running code ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
