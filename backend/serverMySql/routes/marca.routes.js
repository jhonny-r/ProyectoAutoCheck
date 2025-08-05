const MarcaController = require('../controllers/marca.controller');

module.exports = (app) => {
    app.post('/api/marcas', MarcaController.createMarca);
    app.get('/api/marcas', MarcaController.getAllMarcas);
    app.get('/api/marcas/:id', MarcaController.getMarca);
    app.put('/api/marcas/:id', MarcaController.updateMarca);
    app.delete('/api/marcas/:id', MarcaController.deleteMarca);
};
