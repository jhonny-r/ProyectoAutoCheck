const NivelRiesgoController = require('../controllers/nivelRiesgo.controller');

module.exports = (app) => {
    app.post('/api/nivelesRiesgo', NivelRiesgoController.createNivelRiesgo);
    app.get('/api/nivelesRiesgo', NivelRiesgoController.getAllNivelesRiesgo);
    app.get('/api/nivelesRiesgo/:id', NivelRiesgoController.getNivelRiesgo);
    app.put('/api/nivelesRiesgo/:id', NivelRiesgoController.updateNivelRiesgo);
    app.delete('/api/nivelesRiesgo/:id', NivelRiesgoController.deleteNivelRiesgo);
};