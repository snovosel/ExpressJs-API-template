'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    file_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_profile_picture: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id,'
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};
