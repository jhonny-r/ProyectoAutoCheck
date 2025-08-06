const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const NuevaPublicacion = sequelize.define('NuevaPublicacion', {
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
  },
  barrio: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El barrio no puede estar vacío' },
    }
  },
  tipoIncidente: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El tipo de incidente no puede estar vacío' },
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La descripción no puede estar vacía' },
    }
  },
});

module.exports = NuevaPublicacion;