// file: config/database.js

const { Sequelize } = require('sequelize');
// console.log(process.env.DATABASE_URL,"UURRLRLRLRLRL")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // for Render's SSL
    },
  },
});


const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };