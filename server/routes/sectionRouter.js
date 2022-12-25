const Router = require('express');
const sectionController = require('../controllers/sectionController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/create', checkRoleMiddleware('ADMIN'), sectionController.create);
router.delete('/delete', checkRoleMiddleware('ADMIN'), sectionController.delete);
router.put('/edit', checkRoleMiddleware('ADMIN'), sectionController.edit)
router.get('/getAll', sectionController.getAll);


module.exports = router;