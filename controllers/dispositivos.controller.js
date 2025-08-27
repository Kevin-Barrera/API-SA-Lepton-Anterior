const Dispositivo = require('../models/dispositivos.model');

// Consultar todos los dispositivos
exports.getDispositivos = async (req, res) => {
    try {
        const dispositivos = await Dispositivo.find();
        return res.status(200).json({
            message: "Dispositivos obtenidos con éxito",
            data: dispositivos
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar los dispositivos",
            data: error
        });
    }
};

// Consultar un dispositivo por ID
exports.getDispositivoById = async (req, res) => {
    const dispositivoId = req.params.dispositivoId; // Acceder al parámetro de la URL
    try {
        const dispositivo = await Dispositivo.findById(dispositivoId);
        if (!dispositivo) {
            return res.status(404).json({
                message: "Dispositivo no encontrado"
            });
        }
        return res.status(200).json({
            message: "Dispositivo obtenido con éxito",
            data: dispositivo
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar el dispositivo por ID",
            data: error
        });
    }
};

// Crear un nuevo dispositivo
exports.newDispositivo = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Log de los datos recibidos

        const {
            codigoDis,
            nombre,
            precio,
            precioConIVA,
            tipoDis,
            marca,
            modelo,
            tipoImp,
            codigoSat,
            unidad,
            claveUnidad
        } = req.body;

        const newDispositivo = new Dispositivo({
            codigoDis,
            nombre,
            precio,
            precioConIVA,
            tipoDis,
            marca,
            modelo,
            tipoImp,
            codigoSat,
            unidad,
            claveUnidad
        });

        const dispositivoGuardado = await newDispositivo.save();

        return res.status(200).json({
            message: "Dispositivo creado con éxito",
            data: dispositivoGuardado
        });
    } catch (error) {
        console.error('Error al crear el dispositivo:', error.message); // Log del error
        return res.status(500).json({
            message: "Error al crear el dispositivo",
            data: error.message
        });
    }
};




exports.updateDispositivo = async (req, res) => {
    const dispositivoId = req.params.dispositivoId; // ID pasado por la URL
    const newData = req.body; // Datos del cuerpo de la solicitud

    try {
        const updatedDispositivo = await Dispositivo.findOneAndUpdate(
            { idDis: dispositivoId }, // Buscar por idDis
            newData,
            { new: true } // Retornar el documento actualizado
        );
        if (!updatedDispositivo) {
            return res.status(404).json({
                message: "Dispositivo no encontrado"
            });
        }
        return res.status(200).json({
            message: "Dispositivo actualizado con éxito",
            data: updatedDispositivo
        });
    } catch (error) {
        console.error("Error al actualizar el dispositivo:", error);
        return res.status(500).json({
            message: "Error al actualizar el dispositivo",
            data: error.message
        });
    }
};



// Eliminar un dispositivo
exports.deleteDispositivo = async (req, res) => {
    const dispositivoId = req.params.dispositivoId; 
    console.log('ID recibido para eliminar:', dispositivoId);

    try {
        const deletedDispositivo = await Dispositivo.findOneAndDelete({ idDis: dispositivoId });
        if (!deletedDispositivo) {
            return res.status(404).json({
                message: "Dispositivo no encontrado"
            });
        }
        return res.status(200).json({
            message: "Dispositivo eliminado con éxito",
            data: deletedDispositivo
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el dispositivo",
            data: error.message
        });
    }
};

