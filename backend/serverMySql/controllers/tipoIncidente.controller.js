const TipoIncidente = require('../models/tipoIncidente.model.js');

module.exports.createTipoIncidente = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevoTipoIncidente = await TipoIncidente.create({ nombre });
        res.status(201).json(nuevoTipoIncidente);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el tipo de incidente' });
    }
};

module.exports.updateTipoIncidente = async (req, res) => {
    try {
        const [updateRowCount] = await TipoIncidente.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updateRowCount) {
            const updatedTipoIncidente = await TipoIncidente.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedTipoIncidente);
        } else {
            res.status(404).json({ message: 'Tipo de incidente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tipo de incidente' });
    }
};

module.exports.getAllTiposIncidente = async (req, res) => {
    try {
        const tiposIncidente = await TipoIncidente.findAll();
        res.status(200).json(tiposIncidente);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipos de incidente' });
    }
};

module.exports.deleteTipoIncidente = async (req, res) => {
    try {
        const tipoIncidente = await TipoIncidente.findOne({ where: { _id: req.params.id } });
        if (!tipoIncidente) {
            return res.status(404).json({ message: 'Tipo de incidente no encontrado' });
        }
        await TipoIncidente.destroy({ where: { _id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tipo de incidente' });
    }
};
