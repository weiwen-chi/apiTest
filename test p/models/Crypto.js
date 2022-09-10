const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Crypto extends Model {}

Crypto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },

    day_volume: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },

    marketcap: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },

    isFavourite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "crypto",
  }
);

module.exports = Crypto;
