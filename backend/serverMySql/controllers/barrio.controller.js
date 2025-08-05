const Barrio = require('../models/barrio.model.js');

module.exports.createBarrio = async (req, res) => {
    const { nombre, sector, riesgo } = req.body;
    try {
        const nuevoBarrio = await Barrio.create({ nombre, sector, riesgo });
        res.status(201).json(nuevoBarrio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el barrio' });
    }
};

module.exports.getAllBarrios = async (_, res) => {
    try {
        const barrios = await Barrio.findAll();
        res.status(200).json(barrios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los barrios' });
    }
};

module.exports.getBarrio = async (req, res) => {
    try {
        const barrio = await Barrio.findOne({ where: { _id: req.params.id } });
        if (!barrio) {
            return res.status(404).json({ message: 'Barrio no encontrado' });
        }
        res.status(200).json(barrio);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el barrio' });
    }
};

module.exports.updateBarrio = async (req, res) => {
    try {
        const [updateRowCount] = await Barrio.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updateRowCount) {
            const updatedBarrio = await Barrio.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedBarrio);
        } else {
            res.status(404).json({ message: 'Barrio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el barrio' });
    }
};

module.exports.deleteBarrio = async (req, res) => {
    try {
        const barrio = await Barrio.findOne({ where: { _id: req.params.id } });
        if (!barrio) {
            return res.status(404).json({ message: 'Barrio no encontrado' });
        }
        await Barrio.destroy({ where: { _id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el barrio' });
    }
};
