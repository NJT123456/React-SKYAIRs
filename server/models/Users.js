module.exports = (sequelize, Datatype) => {
  const Users = sequelize.define("Users", {
    username: { type: Datatype.STRING },
    first_name: { type: Datatype.STRING },
    last_name: { type: Datatype.STRING },
    email: { type: Datatype.STRING },
    password: { type: Datatype.STRING },
    phone: { type: Datatype.STRING },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Passengers, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Schedules, {
      onDelete: "cascade",
    });
  };

  return Users;
};
