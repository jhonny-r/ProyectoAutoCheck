require('dotenv').config();

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model.js');

module.exports = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization;
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = await Usuario.findOne({ where: { _id: decoded.id } }, { attributes: { exclude: ['contrasena'] } });
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token no válido o ha expirado' });
        }
    }
    if(!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
    }
}