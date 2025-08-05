const SectorController = require('../controllers/sector.controller');

module.exports = (app) => {
    app.post('/api/sectores', SectorController.createSector);
    app.get('/api/sectores', SectorController.getAllSectores);
    app.get('/api/sectores/:id', SectorController.getSector);
    app.put('/api/sectores/:id', SectorController.updateSector);
    app.delete('/api/sectores/:id', SectorController.deleteSector);
};
