const Router = require('express');
const userRouter = require('./userRouter');
const deviceRouter = require('./deviceRouter');
const sectionRouter = require('./sectionRouter');
const typeRouter = require('./typeRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/section', sectionRouter);
router.use('/type', typeRouter);

module.exports = router;