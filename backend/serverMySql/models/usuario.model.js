const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Usuario = sequelize.define('Usuario', {
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
      notNull: { msg: 'El nombre es un campo obligatorio' }
    }
  },
  alias: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'El teléfono es un campo obligatorio' },
      is: {
        args: /^[0-9]+$/,
        msg: 'El teléfono solo puede contener números'
      },
      len: {
        args: [7, 15],
        msg: 'El teléfono debe tener entre 7 y 15 dígitos'
      }
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'La dirección es un campo obligatorio' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: 'El email es un campo obligatorio' },
      isEmail: { msg: 'El email debe ser válido' }
    }
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'La contraseña es un campo obligatorio' }
    }
  },
  rol:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'administrador'
  }
}, {
  tableName: 'usuarios',
  timestamps: true // ✅ Sequelize rellenará createdAt y updatedAt automáticamente
});

module.exports = Usuario;