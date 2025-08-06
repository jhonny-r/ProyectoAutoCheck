const NuevaPublicacion = require('../models/nuevaPublicacion.model');

module.exports.createNuevaPublicacion = async (req, res) => {
    const { nombre, barrio, tipoIncidente, descripcion } = req.body;
    try {
        const nuevaPublicacion = await NuevaPublicacion.create({ nombre, barrio, tipoIncidente, descripcion });
        res.status(201).json(nuevaPublicacion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la publicación' });
    }
};

module.exports.updateNuevaPublicacion = async (req, res) => {
    try {
        const [updateRowCount] = await NuevaPublicacion.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updateRowCount) {
            const updatedPublicacion = await NuevaPublicacion.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedPublicacion);
        } else {
            res.status(404).json({ message: 'Publicación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la publicación' });
    }
};

// Obtener publicaciones por barrio
module.exports.getPublicacionesPorBarrio = async (req, res) => {
    try {
        const publicaciones = await NuevaPublicacion.findAll({
            where: { barrio: req.params.barrio }
        });
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las publicaciones por barrio' });
    }
};

module.exports.deleteNuevaPublicacion = async (req, res) => {
    try {
        const publicacion = await NuevaPublicacion.findOne({ where: { _id: req.params.id } });
        if (!publicacion) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        await NuevaPublicacion.destroy({ where: { _id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la publicación' });
    }
};
