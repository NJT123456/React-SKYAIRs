module.exports = (sequelize, Datatype) => {
  const Passengers = sequelize.define("Passengers", {
    first_name: Datatype.STRING(),
    last_name: Datatype.STRING(),
    gender: Datatype.ENUM("MALE", "FEMALE"),
  });


  Passengers.associate = (models) => {
    Passengers.hasMany(models.Passenger_schedule, {
      onDelete: "cascade",
    });
  };

  return Passengers;
};
