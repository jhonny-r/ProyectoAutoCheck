const NivelRiesgo = require('../models/nivelRiesgo.model');

module.exports.createNivelRiesgo = async (req, res) => {
    const {riesgo} = req.body;
    try {
        if (!riesgo) {
            return res.status(400).json({ message: 'El nivel de riesgo es obligatorio' });
        }
        const nuevoNivelRiesgo = await NivelRiesgo.create({riesgo});
        res.status(201).json(nuevoNivelRiesgo);
    }catch (error) {
        res.status(500).json({ message: 'Error al crear el nivel de riesgo', error: error.message });
    }
};

module.exports.getAllNivelesRiesgo = async (_, res) => {
    try {
        const nivelesRiesgo = await NivelRiesgo.findAll();
        res.status(200).json(nivelesRiesgo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los niveles de riesgo', error: error.message });
    }
};

module.exports.getNivelRiesgo = async (req, res) => {
    try {
        const nivelRiesgo = await NivelRiesgo.findOne({ where: { _id: req.params.id } });
        if (!nivelRiesgo) {
            return res.status(404).json({ message: 'Nivel de riesgo no encontrado' });
        }
        res.status(200).json(nivelRiesgo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el nivel de riesgo', error: error.message });
    }
};

module.exports.updateNivelRiesgo = async (req, res) => {
    try {
        const [updateRowCount] = await NivelRiesgo.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updateRowCount) {
            const updatedNivelRiesgo = await NivelRiesgo.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedNivelRiesgo);
        } else {
            res.status(404).json({ message: 'Nivel de riesgo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el nivel de riesgo', error: error.message });
    }
};
module.exports.deleteNivelRiesgo = async (req, res) => {
    try {
        const nivelRiesgo = await NivelRiesgo.findOne({ where: { _id: req.params.id } });
        if (!nivelRiesgo) {
            return res.status(404).json({ message: 'Nivel de riesgo no encontrado' });
        }
        await NivelRiesgo.destroy({ where: { _id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el nivel de riesgo', error: error.message });
    }
};