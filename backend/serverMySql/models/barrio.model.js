const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Barrio = sequelize.define('Barrio', {
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
        unique: true, // Evita duplicados en la BDD
        validate: {
            notNull: {msg: 'El nombre del barrio no puede ser nulo'},
        }
    }
});

module.exports = Barrio;