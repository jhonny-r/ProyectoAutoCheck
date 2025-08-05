const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.config');

const TipoVehiculo = sequelize.define('TipoVehiculo', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            notNull: {msg: 'El ID no puede ser nulo'},
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'El nombre es un campo obligatorio'},
        }
    }
}, {
    tableName: 'tipos_vehiculo',
    timestamps: true
});

module.exports = TipoVehiculo;
