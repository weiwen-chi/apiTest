//Allow users to have multiple cryptos
//and cryptos to have many users
//by using the UserCrypto through model.

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserCrypto extends Model {}

UserCrypto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },

    crypto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "crypto",
        key: "id",
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "usercrypto",
  }
);

module.exports = UserCrypto;
