module.exports = function (sequelize, DataTypes) {
  var hikes = sequelize.define("hikes", {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    mountain: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    minutestaken: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hourstaken: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    datehiked: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  hikes.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    hikes.belongsTo(models.hiker, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return hikes;
};
