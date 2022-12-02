const Router = require('express');
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/create', checkRoleMiddleware('ADMIN'), typeController.create);
router.get('/getAll', typeController.getAll);
router.get('/getAll/:id', typeController.getAllId);
router.patch('/edit', checkRoleMiddleware('ADMIN'), typeController.edit)
router.delete('/delete', checkRoleMiddleware('ADMIN'), typeController.delete);

module.exports = router;