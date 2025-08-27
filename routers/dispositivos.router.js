const express = require('express'); // Importar express
const router = express.Router();    // Importar router
const dispositivosController = require('../controllers/dispositivos.controller'); // Importar el controlador de dispositivos
const authMiddleware = require('../utils/auth.middleware'); // Importar middleware de autenticación

// Rutas para dispositivos
router.get('/', dispositivosController.getDispositivos); // Obtener todos los dispositivos

router.get('/:dispositivoId', dispositivosController.getDispositivoById); // Obtener un dispositivo por ID

router.post('/', /*authMiddleware.authenticateToken,*/ dispositivosController.newDispositivo); // Crear un nuevo dispositivo

router.put('/:dispositivoId', /*authMiddleware.authenticateToken*/ dispositivosController.updateDispositivo); // Actualizar un dispositivo por ID

router.delete('/:dispositivoId',/* authMiddleware.authenticateToken, */dispositivosController.deleteDispositivo); // Eliminar un dispositivo por ID

module.exports = router;
