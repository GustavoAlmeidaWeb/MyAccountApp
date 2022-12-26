const router = require('express').Router();
const BankAccountController = require('../controllers/bankAccountController');

// Middlewares
const authGuard = require('../middlewares/authGuard');
const validate = require('../middlewares/handleValidation');
const { bankAccountCreateValidation } = require('../middlewares/bankAccountValidation');

// Routes
router.delete('/delete/:id', authGuard, BankAccountController.deleteBankAccount);
router.post('/newaccount', authGuard, bankAccountCreateValidation(), validate, BankAccountController.registerBankAccount);
router.get('/', authGuard, BankAccountController.getBankAccounts);

module.exports = router;