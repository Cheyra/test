module.exports = function(sequelize, DataTypes) {
  var mountains = sequelize.define("mountains", {
    Name: DataTypes.STRING,
    Elevation: DataTypes.TEXT,
    Prominence: DataTypes.TEXT,
    State: DataTypes.TEXT,
    LatLong: DataTypes.TEXT,
    Longitude: DataTypes.TEXT
  });
  return mountains;
};