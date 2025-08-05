const TipoVehiculo = require('../models/tipoVehiculo.model');

module.exports.createTipoVehiculo = async (req, res) => {
    const { nombre } = req.body;
    try {
        // Validación de campos obligatorios
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre del tipo de vehículo es obligatorio' });
        }

        const nuevoTipoVehiculo = await TipoVehiculo.create({ nombre });
        res.status(201).json(nuevoTipoVehiculo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el tipo de vehículo', error: error.message });
    }
};

module.exports.getAllTiposVehiculo = async (_, res) => {
    try {
        const tiposVehiculo = await TipoVehiculo.findAll();
        res.status(200).json(tiposVehiculo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipos de vehículo', error: error.message });
    }
};

module.exports.getTipoVehiculo = async (req, res) => {
    try {
        const tipoVehiculo = await TipoVehiculo.findOne({ where: { _id: req.params.id } });
        if (!tipoVehiculo) {
            return res.status(404).json({ message: 'Tipo de vehículo no encontrado' });
        }
        res.status(200).json(tipoVehiculo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el tipo de vehículo', error: error.message });
    }
};

module.exports.updateTipoVehiculo = async (req, res) => {
    try {
        const [updateRowCount] = await TipoVehiculo.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updateRowCount) {
            const updatedTipoVehiculo = await TipoVehiculo.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedTipoVehiculo);
        } else {
            res.status(404).json({ message: 'Tipo de vehículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tipo de vehículo', error: error.message });
    }
};

module.exports.deleteTipoVehiculo = async (req, res) => {
    try {
        const tipoVehiculo = await TipoVehiculo.findOne({ where: { _id: req.params.id } });
        if (!tipoVehiculo) {
            return res.status(404).json({ message: 'Tipo de vehículo no encontrado' });
        }
        await TipoVehiculo.destroy({ where: { _id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tipo de vehículo', error: error.message });
    }
};
