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
  };
  return Tickets;
};
