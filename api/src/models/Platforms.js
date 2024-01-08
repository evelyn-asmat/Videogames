const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Platform', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false, 
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  },
  {
    indexes: [
      { 
        unique: true,   
        fields: [sequelize.fn('lower', sequelize.col('name'))]   
      }
    ],
    timestamps: false
  });
};
