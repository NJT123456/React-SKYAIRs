module.exports = (sequelize, Datatype) => {
  const Tickets = sequelize.define("Tickets", {
    fnumber: Datatype.STRING(),
    depart_time: Datatype.TIME,
    depart_date: Datatype.DATEONLY,
    arrival_time: Datatype.TIME,
    airline: Datatype.STRING(),
    fare: Datatype.FLOAT,
    seat_class: Datatype.ENUM("Economy", "First"),
  });

  Tickets.associate = (models) => {
    Tickets.hasMany(models.Schedules, {
      foreignKey: "flight_id",
      onDelete: "cascade",
    });
    Tickets.belongsTo(models.Locations, {
      foreignKey: "origin_id",
      as: "origin",
      onDelete: "cascade",
    });
    Tickets.belongsTo(models.Locations, {
      foreignKey: "destination_id",
      as: "destination",
      onDelete: "cascade",
    });
  };
  return Tickets;
};
