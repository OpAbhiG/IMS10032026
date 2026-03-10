// models/Asset.js
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "Asset",
    {
      assetId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // ensures unique value
      },
      itemName: {               // frontend field: itemName
        type: DataTypes.STRING,
        allowNull: false,
        field: "itemName"       // DB column
      },
      model: {                  // frontend field: model
        type: DataTypes.STRING,
        allowNull: false,
        field: "model"
      },
      serialNumber: {           // frontend field: serialNumber
        type: DataTypes.STRING,
        allowNull: false,
        field: "serialNumber"   // DB column
      },
      username: {               // frontend field: username
        type: DataTypes.STRING,
        allowNull: false,
        field: "username"
      },
      price: {                  // frontend field: price
        type: DataTypes.FLOAT,
        allowNull: true,
        field: "price"
      },
      vendor: {               // frontend field: vendor
        type: DataTypes.STRING,
        allowNull: false,
        field: "vendor"
      },
      buyDate: {                // frontend field: buyDate
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "buyDate"
      },
      extraDetails: {           // frontend field: extraDetails
        type: DataTypes.TEXT,
        allowNull: true,
        field: "extraDetails"
      }
    },
    {
      tableName: "assets_item",  // must match your actual DB table
      timestamps: false          // no createdAt/updatedAt
    }
  );

  return Asset;
};
