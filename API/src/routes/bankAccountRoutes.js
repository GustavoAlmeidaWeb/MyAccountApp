const router = require('express').Router();
const BankAccountController = require('../controllers/bankAccountController');

// Middlewares
const authGuard = require('../middlewares/authGuard');

// Routes
router.delete('/delete/:id', authGuard, BankAccountController.deleteBankAccount);
router.post('/newaccount', authGuard, BankAccountController.registerBankAccount);
router.get('/', authGuard, BankAccountController.getBankAccounts);

module.exports = router;