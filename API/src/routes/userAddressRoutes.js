const router = require('express').Router();
const UserAddressController = require('../controllers/userAddressController');

// Middlewares
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');
const { userAddressCreateValidation } = require('../middlewares/userAddressValidation');

// Routes
router.delete('/delete/:id', authGuard, UserAddressController.deleteAddress);
router.post('/register', authGuard, userAddressCreateValidation(), validate, UserAddressController.createUserAddress);
router.get('/filter', authGuard, UserAddressController.getAddressByType);
router.get('/', authGuard, UserAddressController.getUserAdresses);

module.exports = router;