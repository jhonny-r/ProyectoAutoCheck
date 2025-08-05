const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Vehiculo = sequelize.define('Vehiculo', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            notNull: {msg: 'El ID no puede ser nulo'},
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {msg: 'La fecha no puede ser nula'},
            isDate: {msg: 'La fecha debe ser una fecha válida'}
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'El tipo de vehiculo no puede ser nulo'},
        }
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Evita duplicados en la BDD
        validate: {
            notNull: {msg: 'La placa no puede ser nula'},
        }
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'La marca no puede ser nula'},
        }
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'El modelo no puede ser nulo'},
        }
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'El color no puede ser nulo'},
        }
    },
    barrio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'El barrio no puede ser nulo'},
        }
    }
});

module.exports = Vehiculo;