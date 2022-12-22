const router = require('express').Router();
const UserAccountController = require('../controllers/userAccountController');

const validate = require('../middlewares/handleValidation.js');
const authGuard = require('../middlewares/authGuard');
const { userCreateValidation, userLoginValidation } = require('../middlewares/userValidation.js');

router.put('/update', authGuard, UserAccountController.updateUser);
router.post('/register', userCreateValidation(), validate, UserAccountController.newUser);
router.post('/login', userLoginValidation(), validate, UserAccountController.loginUser);
router.delete('/delete', authGuard, UserAccountController.deleteUser);
router.get('/', authGuard, UserAccountController.getUser);

module.exports = router;
