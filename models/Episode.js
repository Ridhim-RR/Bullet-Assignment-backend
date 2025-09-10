const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Episode = sequelize.define("Episode", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  episode_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Optionally add:
  season_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },  
}, {
  tableName: "episodes"
});

module.exports = Episode;
