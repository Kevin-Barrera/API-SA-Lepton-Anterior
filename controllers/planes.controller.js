const Plan = require('../models/planes.model');

// Consultar todos los planes
exports.getPlanes = async (req, res) => {
    try {
        const planes = await Plan.find();
        return res.status(200).json({
            message: "Planes obtenidos con éxito",
            data: planes
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar los planes",
            data: error.message
        });
    }
};

// Consultar un plan por ID
exports.getPlanById = async (req, res) => {
    const planId = req.params.planId; // ID pasado por la URL
    try {
        const plan = await Plan.findOne({ idPlan: planId }); // Buscar por idPlan
        if (!plan) {
            return res.status(404).json({
                message: "Plan no encontrado"
            });
        }
        return res.status(200).json({
            message: "Plan obtenido con éxito",
            data: plan
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar el plan por ID",
            data: error.message
        });
    }
};

// Crear un nuevo plan
exports.newPlan = async (req, res) => {
    try {
        const {
            nombrePlan,
            precio,
            duracion,
            noIdentificacion,
            codigoSAT,
            claveUnidad,
            color,
            servicios
        } = req.body;

        // Calcular precio con IVA (16%)
        const precioConIVA = +(precio * 1.16).toFixed(2);

        const newPlan = new Plan({
            nombrePlan,
            precio,
            precioConIVA,
            duracion,
            noIdentificacion,
            codigoSAT,
            claveUnidad,
            color,
            servicios
        });

        const planGuardado = await newPlan.save();

        return res.status(200).json({
            message: "Plan creado con éxito",
            data: planGuardado
        });
    } catch (error) {
        console.error('Error al crear el plan:', error.message);
        return res.status(500).json({
            message: "Error al crear el plan",
            data: error.message
        });
    }
};

// Actualizar un plan
exports.updatePlan = async (req, res) => {
    const planId = req.params.planId; // ID pasado por la URL
    const {
        nombrePlan,
        precio,
        duracion,
        noIdentificacion,
        codigoSAT,
        claveUnidad,
        color,
        servicios
    } = req.body;

    try {
        // Calcular precio con IVA si el precio está en los datos de actualización
        const precioConIVA = precio ? +(precio * 1.16).toFixed(2) : undefined;

        const updatedPlan = await Plan.findOneAndUpdate(
            { idPlan: planId }, // Buscar por idPlan
            {
                nombrePlan,
                precio,
                precioConIVA,
                duracion,
                noIdentificacion,
                codigoSAT,
                claveUnidad,
                color,
                servicios
            },
            { new: true } // Retornar el documento actualizado
        );
        if (!updatedPlan) {
            return res.status(404).json({
                message: "Plan no encontrado"
            });
        }
        return res.status(200).json({
            message: "Plan actualizado con éxito",
            data: updatedPlan
        });
    } catch (error) {
        console.error("Error al actualizar el plan:", error);
        return res.status(500).json({
            message: "Error al actualizar el plan",
            data: error.message
        });
    }
};

// Eliminar un plan
exports.deletePlan = async (req, res) => {
    const planId = req.params.planId; // ID pasado por la URL
    console.log('ID recibido para eliminar:', planId);

    try {
        const deletedPlan = await Plan.findOneAndDelete({ idPlan: planId }); // Buscar y eliminar por idPlan
        if (!deletedPlan) {
            return res.status(404).json({
                message: "Plan no encontrado"
            });
        }
        return res.status(200).json({
            message: "Plan eliminado con éxito",
            data: deletedPlan
        });
    } catch (error) {
        console.error("Error al eliminar el plan:", error);
        return res.status(500).json({
            message: "Error al eliminar el plan",
            data: error.message
        });
    }
};
