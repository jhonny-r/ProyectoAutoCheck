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
    },
    sector: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: 'El sector no puede ser nulo'},
        }
    },
    riesgo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {msg: 'El nivel de riesgo no puede ser nulo'},
            isInt: {msg: 'El nivel de riesgo debe ser un número entero'},
            min: {
                args: [1],
                msg: 'El nivel de riesgo debe ser al menos 1'
            },
            max: {
                args: [3],
                msg: 'El nivel de riesgo no puede ser mayor que 3'
            }
        }
    }
});

module.exports = Barrio;