const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Episode = require("./Episode");

const Media = sequelize.define("Media", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: { // e.g., "Movie", "Series"
    type: DataTypes.STRING,
    allowNull: false,
  },
  genres: {
    type: DataTypes.ARRAY(DataTypes.STRING), // ARRAY for easy searching/filtering
    allowNull: false,
    defaultValue: [],
  },
  languages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
  description: {
    type: DataTypes.TEXT,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // No mp4_url here—instead, videos for episodes/live in Episode model
}, {
  tableName: "media"
});

// Associations
Media.hasMany(Episode, {
  foreignKey: "media_id",
  onDelete: "CASCADE",
});
Episode.belongsTo(Media, {
  foreignKey: "media_id",
});

module.exports = Media;
