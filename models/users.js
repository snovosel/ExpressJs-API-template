/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    petName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    test: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Users'
  });
};
