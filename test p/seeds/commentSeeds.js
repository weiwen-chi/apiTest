const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

const commentArray = [];

function creatTestComment() {
  return {
    comment_text: faker.random.words(15),
    user_id: faker.datatype.number({ min: 1, max: 10 }),
    crypto_id: faker.datatype.number({ min: 1, max: 10 }),
  };
}

Array.from({ length: 10 }).forEach(() => {
  commentArray.push(creatTestComment());
});

const commentSeeds = () => Comment.bulkCreate(commentArray);

module.exports = commentSeeds;
