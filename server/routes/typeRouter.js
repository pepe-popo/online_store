const Router = require('express');
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/create', checkRoleMiddleware('ADMIN'), typeController.create);
router.get('/getAll', typeController.getAll);
//router.delete('/');

module.exports = router;