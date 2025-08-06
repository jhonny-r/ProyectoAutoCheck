const NuevaPublicacionController = require('../controllers/nuevaPublicacion.controller');

module.exports = (app) => {
    app.post('/api/publicaciones', NuevaPublicacionController.createNuevaPublicacion);
    app.get('/api/publicaciones', NuevaPublicacionController.getAllPublicaciones);
    app.put('/api/publicaciones/:id', NuevaPublicacionController.updateNuevaPublicacion);
    app.get('/api/publicaciones/barrio/:barrio', NuevaPublicacionController.getPublicacionesPorBarrio);
    app.delete('/api/publicaciones/:id', NuevaPublicacionController.deleteNuevaPublicacion);
};
