module.exports = {
  up: async (sequelize, DataTypes) => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.addColumn("users", "email", {
      type: DataTypes.STRING,
      allowNull: true, 
    });

    await queryInterface.addColumn("users", "reset_password_token", {
      type: DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("users", "reset_password_expires", {
      type: DataTypes.DATE,
      allowNull: true,
    });

    await queryInterface.addIndex("users", ["email"], {
      unique: true,
      name: "users_email_unique",
    });
  },

  down: async (sequelize) => {
    const queryInterface = sequelize.getQueryInterface();
    
    await queryInterface.removeIndex("users", "users_email_unique");
    
    await queryInterface.removeColumn("users", "email");
    await queryInterface.removeColumn("users", "reset_password_token");
    await queryInterface.removeColumn("users", "reset_password_expires");
  },
};