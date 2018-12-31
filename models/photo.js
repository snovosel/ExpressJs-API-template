'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    file_path: DataTypes.STRING,
    is_profile_picture: DataTypes.BOOLEAN
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};