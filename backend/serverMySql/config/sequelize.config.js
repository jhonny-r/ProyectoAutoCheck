const { Sequelize } = require('sequelize');
const username = 'root';
const password = 'root';
const bdd_name = 'AutoCheck';
const hostName = 'localhost';

const initialSequelize = new Sequelize(`mysql://${username}:${password}@localhost`); initialSequelize.query(`CREATE DATABASE IF NOT EXISTS ${bdd_name};`)
    .then(() => console.log('BDD creada o ya existía'))
    .catch((error) => {
        console.error('Error al crear la BDD', error);
        process.exit(1); // Termina el proceso si hay un error
    });

const sequelize = new Sequelize(bdd_name, username, password, {
    host: hostName,
    dialect: 'mysql'
});
// Se sincroniza los modelos con la base de datos
sequelize.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada (tablas alteradas)');
}).catch(err => {
    console.log('Error al sincronizar la BDD', err);
});
module.exports = sequelize;