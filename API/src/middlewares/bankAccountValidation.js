const { body } = require('express-validator');

const bankAccountCreateValidation = () => {
    return [
        body('bankName')
            .notEmpty()
            .withMessage('O nome do Banco é obrigatório.'),
        body('bankAgency')
            .notEmpty()
            .withMessage('O número da agência é obrigatorio.'),
        body('bankAccount')
            .notEmpty()
            .withMessage('O número da conta é obrigatorio.'),
        ]       
}

module.exports = {
    bankAccountCreateValidation,
}