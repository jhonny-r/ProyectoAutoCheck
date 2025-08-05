const TipoVehiculoController = require('../controllers/tipoVehiculo.controller');

module.exports = (app) => {
    app.post('/api/tiposVehiculo', TipoVehiculoController.createTipoVehiculo);
    app.get('/api/tiposVehiculo', TipoVehiculoController.getAllTiposVehiculo);
    app.get('/api/tiposVehiculo/:id', TipoVehiculoController.getTipoVehiculo);
    app.put('/api/tiposVehiculo/:id', TipoVehiculoController.updateTipoVehiculo);
    app.delete('/api/tiposVehiculo/:id', TipoVehiculoController.deleteTipoVehiculo);
};