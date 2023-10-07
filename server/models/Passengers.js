module.exports = (sequelize, Datatype) => {
  const Passengers = sequelize.define("Passengers", {
    first_name: Datatype.STRING(),
    last_name: Datatype.STRING(),
    gender: Datatype.ENUM("MALE", "FEMALE"),
  });

  Passengers.associate = (models) => {
    Passengers.belongsTo(models.Users, {
      foreignKey: "UserId",
      as: "user",
      onDelete: "cascade",
    });
  };

  return Passengers;
};
