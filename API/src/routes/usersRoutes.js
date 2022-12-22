const router = require('express').Router();
const UserAccountController = require('../controllers/userAccountController');

const validate = require('../middlewares/handleValidation');
const authGuard = require('../middlewares/authGuard');
const { imageUpload } = require('../middlewares/imageUpload');
const { userCreateValidation, userLoginValidation, userUpdateValidation } = require('../middlewares/userValidation.js');

router.put('/update', authGuard, imageUpload.single('image'), userUpdateValidation(), validate, UserAccountController.updateUser);
router.post('/register', userCreateValidation(), validate, UserAccountController.newUser);
router.post('/login', userLoginValidation(), validate, UserAccountController.loginUser);
router.delete('/delete', authGuard, UserAccountController.deleteUser);
router.get('/', authGuard, UserAccountController.getUser);

module.exports = router;
