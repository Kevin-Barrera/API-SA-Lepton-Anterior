const express = require('express'); // Importar express
const router = express.Router();    // Importar router
const serviciosController = require('../controllers/servicios.controller'); // Importar el controlador de servicios
const authMiddleware = require('../utils/auth.middleware'); // Importar middleware de autenticación

// Rutas para servicios
router.get('/', serviciosController.getServicios); // Obtener todos los servicios

router.get('/:servicioId', serviciosController.getServicioById); // Obtener un servicio por ID

router.post('/', /*authMiddleware.authenticateToken,*/ serviciosController.newServicio); // Crear un nuevo servicio

router.put('/:servicioId',/* authMiddleware.authenticateToken, */serviciosController.updateServicio); // Actualizar un servicio por ID

router.delete('/:servicioId',/* authMiddleware.authenticateToken,*/ serviciosController.deleteServicio); // Eliminar un servicio por ID

module.exports = router;
