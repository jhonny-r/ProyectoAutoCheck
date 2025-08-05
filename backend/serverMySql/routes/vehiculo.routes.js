const VehiculoController = require('../controllers/vehiculo.controller.js');

module.exports = (app) => {
    app.post('/api/vehiculos', VehiculoController.createVehiculo);
    app.get('/api/vehiculos', VehiculoController.getAllVehiculos);
    app.get('/api/vehiculos/:id', VehiculoController.getVehiculo);
    app.put('/api/vehiculos/:id', VehiculoController.updateVehiculo);
    app.delete('/api/vehiculos/:id', VehiculoController.deleteVehiculo);
    app.get('/api/vehiculos/consulta/:placa', VehiculoController.consultarPlaca);
    app.get('/api/vehiculos/mas/robados', VehiculoController.getModelosRobados);
    app.get('/api/barrios/mas/robados', VehiculoController.getBarriosPeligrosos);
    app.get('/api/top/vehiculos', VehiculoController.topVehiculos);
};

