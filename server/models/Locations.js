module.exports = (sequelize, Datatype) => {
  const Locations = sequelize.define("Locations", {
    city: Datatype.STRING(),
    city_thai: Datatype.STRING(),
    airport: Datatype.STRING(),
    airport_thai: Datatype.STRING(),
    code: Datatype.STRING(),
    country: Datatype.STRING(),
  });

  Locations.associate = (models) => {
    Locations.hasMany(models.Tickets, {
      as: "origin", foreignKey: "origin_id",
      onDelete: "cascade",
    });
    Locations.hasMany(models.Tickets, {
      as: "destination",
    foreignKey: "destination_id",
    onDelete: "cascade",
    })
  };
  return Locations;
};
