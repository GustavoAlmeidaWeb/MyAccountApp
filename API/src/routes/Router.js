const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const bankRoutes = require('./bankAccountRoutes');
const addressRoutes = require('./userAddressRoutes');

router.use('/user', userRoutes);
router.use('/bank', bankRoutes);
router.use('/address', addressRoutes);

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API WORKING!'
    });
});

module.exports = router;