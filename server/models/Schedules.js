module.exports = (sequelize, Datatype) => {
  const Schedules = sequelize.define("Schedules", {
    ref_no: Datatype.STRING(6),
    flight_departdate: Datatype.DATE,
    flight_returndate: Datatype.DATE,
    flight_fare: Datatype.FLOAT,
    total_fare: Datatype.FLOAT,
    seat_class: Datatype.STRING(),
    booking_date: Datatype.DATE,
    status: Datatype.ENUM("PENDING", "CONFIRMED", "CANCELLED"),
  });

  Schedules.associate = (models) => {
    Schedules.hasMany(models.Passenger_schedule, {
      onDelete: "cascade",
    });
  };

  return Schedules;
};