const Servicio = require('../models/servicios.model');

// Consultar todos los servicios
exports.getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        return res.status(200).json({
            message: "Servicios obtenidos con éxito",
            data: servicios
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar los servicios",
            data: error.message
        });
    }
};

// Consultar un servicio por ID
exports.getServicioById = async (req, res) => {
    const servicioId = req.params.servicioId; // ID pasado por la URL
    try {
        const servicio = await Servicio.findOne({ idServ: servicioId }); // Buscar por idServ
        if (!servicio) {
            return res.status(404).json({
                message: "Servicio no encontrado"
            });
        }
        return res.status(200).json({
            message: "Servicio obtenido con éxito",
            data: servicio
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar el servicio por ID",
            data: error.message
        });
    }
};

// Crear un nuevo servicio
exports.newServicio = async (req, res) => {
    try {
        const { descripcion, precio, codigo } = req.body;

        // Calcular precio con IVA (16%)
        const precioConIVA = +(precio * 1.16).toFixed(2);

        const newServicio = new Servicio({
            descripcion,
            precio,
            precioConIVA,
            codigo
        });

        const servicioGuardado = await newServicio.save();

        return res.status(200).json({
            message: "Servicio creado con éxito",
            data: servicioGuardado
        });
    } catch (error) {
        console.error('Error al crear el servicio:', error.message); // Log del error
        return res.status(500).json({
            message: "Error al crear el servicio",
            data: error.message
        });
    }
};

// Actualizar un servicio
exports.updateServicio = async (req, res) => {
    const servicioId = req.params.servicioId; // ID pasado por la URL
    const { descripcion, precio, codigo } = req.body;

    try {
        // Calcular precio con IVA si el precio está en los datos de actualización
        const precioConIVA = precio ? +(precio * 1.16).toFixed(2) : undefined;

        const updatedServicio = await Servicio.findOneAndUpdate(
            { idServ: servicioId }, // Buscar por idServ
            {
                descripcion,
                precio,
                precioConIVA,
                codigo
            },
            { new: true } // Retornar el documento actualizado
        );
        if (!updatedServicio) {
            return res.status(404).json({
                message: "Servicio no encontrado"
            });
        }
        return res.status(200).json({
            message: "Servicio actualizado con éxito",
            data: updatedServicio
        });
    } catch (error) {
        console.error("Error al actualizar el servicio:", error);
        return res.status(500).json({
            message: "Error al actualizar el servicio",
            data: error.message
        });
    }
};

// Eliminar un servicio
exports.deleteServicio = async (req, res) => {
    const servicioId = req.params.servicioId; // ID pasado por la URL
    console.log('ID recibido para eliminar:', servicioId);

    try {
        const deletedServicio = await Servicio.findOneAndDelete({ idServ: servicioId }); // Buscar y eliminar por idServ
        if (!deletedServicio) {
            return res.status(404).json({
                message: "Servicio no encontrado"
            });
        }
        return res.status(200).json({
            message: "Servicio eliminado con éxito",
            data: deletedServicio
        });
    } catch (error) {
        console.error("Error al eliminar el servicio:", error);
        return res.status(500).json({
            message: "Error al eliminar el servicio",
            data: error.message
        });
    }
};
