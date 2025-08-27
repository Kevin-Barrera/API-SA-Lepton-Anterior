const express = require('express'); //Importar express
const router = express.Router();    //Importar router
const planesController = require('../controllers/planes.controller'); //Importar 
const authMiddleware = require('../utils/auth.middleware');

router.get('/', planesController.getPlanes);

router.get('/:planId', planesController.getPlanById);

router.post('/', /*authMiddleware.authenticateToken,*/ planesController.newPlan);

router.put('/:planId', /*authMiddleware.authenticateToken,*/planesController.updatePlan);

router.delete('/:planId',/* authMiddleware.authenticateToken,*/planesController.deletePlan);

module.exports = router;