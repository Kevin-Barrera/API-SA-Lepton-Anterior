const express = require('express'); // Importar express
const router = express.Router();    // Importar router
const clientesController = require('../controllers/clientes.controller'); // Importar el controlador de clientes
const authMiddleware = require('../utils/auth.middleware'); // Importar middleware de autenticación

// Rutas para clientes

router.get('/check-email', clientesController.checkEmailExists); // Ruta para verificar si un correo existe

router.get('/', clientesController.getClientes); // Obtener todos los clientes

router.get('/:clienteId', clientesController.getClienteById); // Obtener un cliente por ID

router.post('/', /*authMiddleware.authenticateToken*/ clientesController.newCliente); // Crear un nuevo cliente

router.put('/:clienteId', /*authMiddleware.authenticateToken*/ clientesController.updateCliente); // Actualizar un cliente por ID

router.delete('/:clienteId', /*authMiddleware.authenticateToken,*/ clientesController.deleteCliente); // Eliminar un cliente por ID

module.exports = router;
