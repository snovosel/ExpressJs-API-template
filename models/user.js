'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    pet_name: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Photo);
  };
  return User;
};
