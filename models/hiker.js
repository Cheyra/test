//var Sequelize = require("sequelize");
// require("sequelize-isunique-validator")(Sequelize);
module.exports = function(sequelize, DataTypes) {
  var hiker = sequelize.define("hiker", {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: [1, 16]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },

    information: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 200]
      }
    },
    imagetext: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  hiker.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    hiker.hasMany(models.hikes, {
      onDelete: "cascade"
    });
  };

  return hiker;
};
