const UsuarioController = require('../controllers/usuario.controller');

module.exports = (app) => { 
    app.post('/api/usuarios', UsuarioController.createUsuario);
    app.get('/api/usuarios', UsuarioController.getAllUsuarios);
    app.get('/api/usuarios/:id', UsuarioController.getUsuario);
    app.put('/api/usuarios/:id', UsuarioController.updateUsuario);
    app.delete('/api/usuarios/:id', UsuarioController.deleteUsuario);
    app.post('/api/usuarios/login', UsuarioController.loginUsuario);
    app.put('/api/usuarios/:id/cambiar-contrasena', UsuarioController.cambiarContrasena);
}