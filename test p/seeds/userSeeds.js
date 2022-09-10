const { faker } = require("@faker-js/faker");
const { User } = require("../models");

const userArray = [];

function createTestUser() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    profile_img: faker.image.imageUrl(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  userArray.push(createTestUser());
});

const userSeeds = () => User.bulkCreate(userArray, { individualHooks: true });

module.exports = userSeeds;
