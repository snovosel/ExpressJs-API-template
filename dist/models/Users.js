'use strict';

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};