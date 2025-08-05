const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.config');

const NivelRiesgo = sequelize.define('NivelRiesgo', {
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            notNull: {msg: 'El ID no puede ser nulo'},
        }
    },
    riesgo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {msg: 'El nivel de riesgo es un campo obligatorio'},
        }
    }
}, {
    tableName: 'niveles_riesgo',
    timestamps: true
});

module.exports = NivelRiesgo;
