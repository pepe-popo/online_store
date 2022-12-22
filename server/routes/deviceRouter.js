const Router = require('express');
const deviceController = require('../controllers/deviceController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/create', checkRoleMiddleware('ADMIN'), deviceController.create);
// router.get('/getAll', deviceController.getAll);
// router.get('/:id', deviceController.getOne);
//router.delete('/')

module.exports = router;