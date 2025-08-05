const Vehiculo = require('../models/vehiculo.model.js');

module.exports.createVehiculo = async (req, res) => {
    const { fecha, tipo, placa, marca, modelo, color, barrio } = req.body;
    try {
        const nuevoVehiculo = await Vehiculo.create({
            fecha,
            tipo,
            placa,
            marca,
            modelo,
            color,
            barrio
        });

        res.status(201).json(nuevoVehiculo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el vehiculo' });
    }
};

module.exports.getAllVehiculos = async (_, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los vehiculos' });
    }
};

module.exports.getVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findOne({ where: { _id: req.params.id } });
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehiculo no encontrado' });
        }
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el vehiculo' });
    }
};

module.exports.updateVehiculo = async (req, res) => {
    try {
        const [updateRowCount] = await Vehiculo.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updateRowCount) {
            const updatedVehiculo = await Vehiculo.findOne({ where: { _id: req.params.id } });
            res.status(200).json(updatedVehiculo);
        } else {
            res.status(404).json({ message: 'Vehiculo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el vehiculo' });
    }
};

module.exports.deleteVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findOne({ where: { _id: req.params.id } });
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehiculo no encontrado' });
        }
        await vehiculo.destroy({where: { _id: req.params.id }});
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el vehiculo' });
    }
};

module.exports.consultarPlaca = async (req, res) => {
    try {
        const placa = req.params.placa.toUpperCase();
        const vehiculo = await Vehiculo.findOne({where: { placa }});
        if (vehiculo){
            return res.json({fecha: vehiculo.fecha, barrio: vehiculo.barrio, mensaje: `El vehiculo con la placa ${placa} fue reportado como robado en el barrio ${vehiculo.barrio}`});
        } else{
            return res.json({mensaje: `Vehiculo con la placa ${placa} no ha sido reportado como robado`});
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al consultar la placa' });
    }
};

module.exports.getModelosRobados = async (_, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();
        const conteoModelos = {};

        for (const vehiculo of vehiculos) {
            if (conteoModelos[vehiculo.modelo]){
                conteoModelos[vehiculo.modelo]++;
            } else {
                conteoModelos[vehiculo.modelo] = 1;
            }
        }

        const modelosOrdenados = Object.entries(conteoModelos)
            .sort((a, b) => b[1] - a[1]) // Ordena de mayor a menor
            .slice(0, 5) // Toma los 5 modelos más robados
            .map(entry => entry[0]); // Extrae solo los modelos
        res.status(200).json(modelosOrdenados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los modelos de los vehículos más robados' });
    }
};

module.exports.getBarriosPeligrosos = async (_, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();
        const conteoBarrios = {};

        for (const vehiculo of vehiculos) {
            if (conteoBarrios[vehiculo.barrio]){
                conteoBarrios[vehiculo.barrio]++;
            } else {
                conteoBarrios[vehiculo.barrio] = 1;
            }
        }

        const barriosOrdenados = Object.entries(conteoBarrios)
            .sort((a, b) => b[1] - a[1]) // Ordena de mayor a menor
            .slice(0, 5) // Toma los 5 barrios más peligrosos
            .map(entry => entry[0]); // Extrae solo los nombres de los barrios
        res.status(200).json(barriosOrdenados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los barrios más peligrosos' });
    }
};

module.exports.topVehiculos = async (_, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();
        const conteoAutos = {};

        for (const vehiculo of vehiculos) {
            const key = `${vehiculo.marca} ${vehiculo.modelo}`;
            conteoAutos[key] = (conteoAutos[key] || 0) + 1;
        }

        const autosOrdenados = Object.entries(conteoAutos)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([auto, cantidad]) => ({ auto, cantidad }));

        res.status(200).json(autosOrdenados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los autos más repetidos' });
    }
};