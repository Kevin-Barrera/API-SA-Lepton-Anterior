const Cliente = require('../models/clientes.model');

// Consultar todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    return res.status(200).json({
      message: "Clientes obtenidos con éxito",
      data: clientes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar los clientes",
      data: error,
    });
  }
};

// Consultar un cliente por ID
exports.getClienteById = async (req, res) => {
  const clienteId = req.params.clienteId; // Acceder al parámetro de la URL
  try {
    const cliente = await Cliente.findOne({ idCliente: clienteId });
    if (!cliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }
    return res.status(200).json({
      message: "Cliente obtenido con éxito",
      data: cliente,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar cliente por ID",
      data: error,
    });
  }
};

// Verificar si el correo ya está registrado
exports.checkEmailExists = async (req, res) => {
  try {
      const email = req.query.email; // Extraer el correo de los parámetros
      if (!email) {
          return res.status(400).json({
              message: "El correo es obligatorio",
          });
      }
      console.log("Correo recibido para verificar:", email);

      // Buscar el correo en la base de datos
      const existingCliente = await Cliente.findOne({ "contacto.correo": email });
      console.log("Resultado de búsqueda:", existingCliente);

      return res.status(200).json({
          message: existingCliente ? "Correo ya registrado" : "Correo disponible",
          exists: !!existingCliente,
      });
  } catch (error) {
      console.error("Error al verificar el correo:", error.stack); // Log detallado
      return res.status(500).json({
          message: "Error al verificar el correo",
          data: error.message,
      });
  }
};



// Crear un nuevo cliente
exports.newCliente = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // Log de los datos recibidos

    const {
      nombreEmpresa,
      nombre,
      aPaterno,
      aMaterno,
      domicilio,
      contacto,
      datosComerciales, // Incluye datos comerciales en la creación
      estatus,
    } = req.body;

    const newCliente = new Cliente({
      nombreEmpresa,
      nombre,
      aPaterno,
      aMaterno,
      domicilio,
      contacto,
      datosComerciales, // Añadir datos comerciales
      estatus,
    });

    const clienteGuardado = await newCliente.save();

    return res.status(200).json({
      message: "Cliente creado con éxito",
      data: clienteGuardado,
    });
  } catch (error) {
    console.error('Error al crear el cliente:', error.message); // Log del error
    return res.status(500).json({
      message: "Error al crear el cliente",
      data: error.message,
    });
  }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
  const clienteId = req.params.clienteId; // ID pasado por la URL
  const newData = req.body; // Datos del cuerpo de la solicitud

  try {
    const updatedCliente = await Cliente.findOneAndUpdate(
      { idCliente: clienteId }, // Buscar por idCliente
      newData,
      { new: true } // Retornar el documento actualizado
    );
    if (!updatedCliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }
    return res.status(200).json({
      message: "Cliente actualizado con éxito",
      data: updatedCliente,
    });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    return res.status(500).json({
      message: "Error al actualizar el cliente",
      data: error.message,
    });
  }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  const clienteId = req.params.clienteId;
  console.log('ID recibido para eliminar:', clienteId);

  try {
    const deletedCliente = await Cliente.findOneAndDelete({ idCliente: clienteId });
    if (!deletedCliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }
    return res.status(200).json({
      message: "Cliente eliminado con éxito",
      data: deletedCliente,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el cliente",
      data: error.message,
    });
  }
};
