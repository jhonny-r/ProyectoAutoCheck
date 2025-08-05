const Marca = require('../models/marca.model');

module.exports.createMarca = async (req, res) => {
    const {nombre} = req.body;
    try {
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre de la marca es obligatorio' });
        }
        const nuevaMarca = await Marca.create({ nombre });
        res.status(201).json(nuevaMarca);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la marca', error: error.message });
    }
};

module.exports.getAllMarcas = async (_, res) => {
    try {
        const marcas = await Marca.findAll();
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las marcas', error: error.message });
    }
};

module.exports.getMarca = async (req, res) => {
    try {
        const marca = await Marca.findOne({ where: { _id: req.params.id } });
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.status(200).json(marca);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la marca', error: error.message });
    }
};

module.exports.updateMarca = async (req, res) => {
    try {
        const [updateRowCount] = await Marca.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updateRowCount) {
            const updatedMarca = await Marca.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedMarca);
        } else {
            res.status(404).json({ message: 'Marca no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la marca', error: error.message });
    }
};

module.exports.deleteMarca = async (req, res) => {
    try {
        const marca = await Marca.findOne({ where: { _id: req.params.id } });
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        await Marca.destroy({ where: { _id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la marca', error: error.message });
    }
};
