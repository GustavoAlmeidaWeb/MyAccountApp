const router = require('express').Router();
const userRoutes = require('./usersRoutes');

router.use('/user', userRoutes);

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API WORKING!'
    });
});

module.exports = router;