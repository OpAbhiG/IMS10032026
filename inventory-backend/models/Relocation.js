// models/Relocation.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Relocation",
    {
      assetId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fromLocation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      toLocation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      relocatedBy: {
        type: DataTypes.STRING,
        allowNull: false
      },
      assignedTo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      relocatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "asset_relocations",
      timestamps: false
    }
  );
};
