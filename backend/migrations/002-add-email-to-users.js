module.exports = {
  up: async (sequelize, DataTypes) => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.addColumn("users", "email", {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn("users", "reset_password_token", {
      type: DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("users", "reset_password_expires", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  down: async (sequelize) => {
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.removeColumn("users", "email");
    await queryInterface.removeColumn("users", "reset_password_token");
    await queryInterface.removeColumn("users", "reset_password_expires");
  },
};
