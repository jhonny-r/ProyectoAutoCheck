const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const TipoIncidente = sequelize.define('TipoIncidente', {
  _id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notNull: { msg: 'El ID no puede ser nulo' },
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre no puede estar vacío' },
    }
  }
});

module.exports = TipoIncidente;
