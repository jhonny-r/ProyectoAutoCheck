const TipoIncidenteController = require('../controllers/tipoIncidente.controller');

module.exports = (app) => {
    app.post('/api/tipo-incidente', TipoIncidenteController.createTipoIncidente);
    app.get('/api/tipo-incidente', TipoIncidenteController.getAllTiposIncidente);
    app.put('/api/tipo-incidente/:id', TipoIncidenteController.updateTipoIncidente);
    app.delete('/api/tipo-incidente/:id', TipoIncidenteController.deleteTipoIncidente);
};