module.exports = (sequelize, DataTypes) => {
  const Supplies = sequelize.define('supplies', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isNecessary: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    alreadyOwn: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  })
  return Supplies;
};