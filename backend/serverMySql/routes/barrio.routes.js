const BarrioController = require('../controllers/barrio.controller.js');

module.exports = (app) => { 
    app.post('/api/barrios', BarrioController.createBarrio);
    app.get('/api/barrios', BarrioController.getAllBarrios);
    app.get('/api/barrios/:id', BarrioController.getBarrio);
    app.put('/api/barrios/:id', BarrioController.updateBarrio);
    app.delete('/api/barrios/:id', BarrioController.deleteBarrio);
    app.get('/api/top/barrios', BarrioController.TopBarrios);
    
};
