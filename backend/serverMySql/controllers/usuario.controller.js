const Usuario = require('../models/usuario.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, rol) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET || '12345678', {
        expiresIn: '30d'
    });
};

module.exports.createUsuario = async (req, res) => {
    const { nombre, alias, telefono, direccion, email, contrasena, confirmarContrasena } = req.body;

    try {
        // Validación de campos obligatorios
        if (!nombre || !telefono || !direccion || !email || !contrasena || !confirmarContrasena) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
        }

        if (contrasena !== confirmarContrasena) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden' });
        }

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        const nuevoUsuario = await Usuario.create({
            nombre,
            alias,
            telefono,
            direccion,
            email,
            contrasena: hashedPassword,
            rol: 'usuario'
        });

        res.status(201).json({
            _id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            alias: nuevoUsuario.alias,
            telefono: nuevoUsuario.telefono,
            direccion: nuevoUsuario.direccion,
            email: nuevoUsuario.email,
            rol: nuevoUsuario.rol,
            createdAt: nuevoUsuario.createdAt,
            updatedAt: nuevoUsuario.updatedAt,
            token: generateToken(nuevoUsuario._id, nuevoUsuario.rol)
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al crear al usuario', error: error.message });
    }
};

module.exports.loginUsuario = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const usuarioEncontrado = await Usuario.findOne({ where: { email } });

        if (!usuarioEncontrado) {
            return res.status(401).json({ msg: 'Usuario no encontrado' });
        }

        const contrasenaValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

        if (!contrasenaValida) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        res.status(200).json({
            msg: 'Ingreso exitoso',
            _id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            alias: usuarioEncontrado.alias,
            telefono: usuarioEncontrado.telefono,
            direccion: usuarioEncontrado.direccion,
            email: usuarioEncontrado.email,
            rol: usuarioEncontrado.rol,
            token: generateToken(usuarioEncontrado._id, usuarioEncontrado.rol)
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

module.exports.getAllUsuarios = async (_, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

module.exports.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { id: req.params.id } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
}; 

module.exports.updateUsuario = async (req, res) => {
    try {
        if(req.body.contrasena) {
            const salt = await bcrypt.genSalt(10);
            req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt);
        }
        const [updateRowCount] = await Usuario.update(req.body, {
            where: { _id: req.params.id }
        });

        if (updateRowCount) {
            const updatedUsuario = await Usuario.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedUsuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
};

module.exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { _id: req.params.id } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await usuario.destroy(); // No es necesario `where` aquí porque ya tienes la instancia

        res.status(200).json({ message: 'Usuario eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
};

