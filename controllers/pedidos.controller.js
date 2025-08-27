const Pedido = require('../models/pedidos.model');

// Obtener todos los pedidos
exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('cliente')
      .populate('plan')
      .populate('dispositivos')
      .populate('servicios');
    return res.status(200).json({
      message: "Pedidos obtenidos con éxito",
      data: pedidos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar los pedidos",
      data: error.message,
    });
  }
};

// Obtener un pedido por ID
exports.getPedidoById = async (req, res) => {
  const pedidoId = req.params.pedidoId;
  try {
    const pedido = await Pedido.findOne({ idPedido: pedidoId })
      .populate('cliente')
      .populate('plan')
      .populate('dispositivos')
      .populate('servicios');
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    return res.status(200).json({ message: "Pedido obtenido con éxito", data: pedido });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar el pedido",
      data: error.message,
    });
  }
};

// Crear un nuevo pedido
exports.newPedido = async (req, res) => {
  try {
    const {
      cliente,
      plan,
      dispositivos,
      servicios,
      vehiculo,
      imei,
      fechaInstalacion,
      estatus,
      precio,
      descuento,
    } = req.body;

    // Calcular total
    const total = (precio - descuento).toFixed(2);

    const newPedido = new Pedido({
      cliente,
      plan,
      dispositivos,
      servicios,
      vehiculo,
      imei,
      fechaInstalacion,
      estatus,
      precio,
      descuento,
      total,
    });

    const pedidoGuardado = await newPedido.save();

    return res.status(200).json({
      message: "Pedido creado con éxito",
      data: pedidoGuardado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear el pedido",
      data: error.message,
    });
  }
};

// Actualizar un pedido
exports.updatePedido = async (req, res) => {
  const pedidoId = req.params.pedidoId;
  const newData = req.body;

  try {
    if (newData.precio !== undefined && newData.descuento !== undefined) {
      newData.total = (newData.precio - newData.descuento).toFixed(2);
    }

    const updatedPedido = await Pedido.findOneAndUpdate(
      { idPedido: pedidoId },
      newData,
      { new: true }
    );
    if (!updatedPedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    return res.status(200).json({
      message: "Pedido actualizado con éxito",
      data: updatedPedido,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el pedido",
      data: error.message,
    });
  }
};

// Eliminar un pedido
exports.deletePedido = async (req, res) => {
  const pedidoId = req.params.pedidoId;
  try {
    const deletedPedido = await Pedido.findOneAndDelete({ idPedido: pedidoId });
    if (!deletedPedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    return res.status(200).json({
      message: "Pedido eliminado con éxito",
      data: deletedPedido,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el pedido",
      data: error.message,
    });
  }
};
