const User = require("./User");
const Comment = require("./Comment");
const Crypto = require("./Crypto");
const UserCrypto = require("./UserCrypto");

//user to comment associations
User.hasMany(Comment, { foreignKey: "user_id", onDelete: "set null" });
Comment.belongsTo(User, { foreignKey: "user_id", onDelete: "set null" });

//comment to crypto associations
Crypto.hasMany(Comment, { foreignKey: "crypto_id", onDelete: "set null" });
Comment.belongsTo(Crypto, { foreignKey: "crypto_id", onDelete: "set null" });

//user to crypto associations
User.belongsToMany(Crypto, {
  through: UserCrypto,
  foreignKey: "user_id",
});

Crypto.belongsToMany(User, {
  through: UserCrypto,
  foreignKey: "crypto_id",
});

module.exports = { User, Comment, Crypto, UserCrypto };
