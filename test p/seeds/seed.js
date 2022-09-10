const sequelize = require("../config/connection");

const { User } = require("../models");
const userData = require("./userData.json");

const { Crypto } = require("../models");
const cryptoData = require("./cryptoData.json");

// const userSeeds = require("./userSeeds");
// const commentSeeds = require("./commentSeeds");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // console.log("-----------database seed-----------");
  // await userSeeds();
  // console.log("-----------users seeded----------");

  await Crypto.bulkCreate(cryptoData, {
    individualHooks: true,
    returning: true,
  });

  // console.log("-----------database seed-----------");
  // await commentSeeds();
  // console.log("-----------users seeded----------");

  process.exit(0);
};

seedDatabase();
