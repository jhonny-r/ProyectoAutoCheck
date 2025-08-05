const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Marca = sequelize.define('Marca', {
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
    tableName: 'marcas',
    timestamps: true
});

module.exports = Marca;
