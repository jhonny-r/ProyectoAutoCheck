const Sector = require('../models/sector.model');

module.exports.createSector = async (req, res) => {
    const { nombre } = req.body;
    try {
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre del sector es obligatorio' });
        }
        const nuevoSector = await Sector.create({ nombre });
        res.status(201).json(nuevoSector);
    }catch (error) {
        res.status(500).json({ message: 'Error al crear el sector', error: error.message });
    }
};

module.exports.getAllSectores = async (_, res) => {
    try {
        const sectores = await Sector.findAll();
        res.status(200).json(sectores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los sectores', error: error.message });
    }
};

module.exports.getSector = async (req, res) => {
    try {
        const sector = await Sector.findOne({ where: { _id: req.params.id } });
        if (!sector) {
            return res.status(404).json({ message: 'Sector no encontrado' });
        }
        res.status(200).json(sector);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el sector', error: error.message });
    }
};

module.exports.updateSector = async (req, res) => {
    try {
        const [updateRowCount] = await Sector.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updateRowCount) {
            const updatedSector = await Sector.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedSector);
        } else {
            res.status(404).json({ message: 'Sector no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el sector', error: error.message });
    }
};

module.exports.deleteSector = async (req, res) => {
    try {
        const sector = await Sector.findOne({ where: { _id: req.params.id } });
        if (!sector) {
            return res.status(404).json({ message: 'Sector no encontrado' });
        }
        await Sector.destroy({ where: { _id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el sector', error: error.message });
    }
};
