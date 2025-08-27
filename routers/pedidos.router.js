const express = require('express'); // Importar express
const router = express.Router();    // Importar router
const pedidosController = require('../controllers/pedidos.controller'); // Importar el controlador de pedidos
const authMiddleware = require('../utils/auth.middleware'); // Importar middleware de autenticación

// Rutas para pedidos
router.get('/', pedidosController.getPedidos); // Obtener todos los pedidos

router.get('/:pedidoId', pedidosController.getPedidoById); // Obtener un pedido por ID

router.post('/', /*authMiddleware.authenticateToken,*/ pedidosController.newPedido); // Crear un nuevo pedido

router.put('/:pedidoId', /*authMiddleware.authenticateToken,*/ pedidosController.updatePedido); // Actualizar un pedido por ID

router.delete('/:pedidoId', /*authMiddleware.authenticateToken,*/ pedidosController.deletePedido); // Eliminar un pedido por ID

module.exports = router;
