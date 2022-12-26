const { body } = require('express-validator');

const userAddressCreateValidation = () => {
    return [
        body('addressType')
            .notEmpty()
            .withMessage('O nome é obrigatório.'),
        body('addressZipcode')
            .notEmpty()
            .withMessage('O CEP é obrigatorio.')
            .isLength({ min: 8 })
            .withMessage('Por favor digite um CEP válido.'),
        body('addressStreet')
            .notEmpty()
            .withMessage('O nome da Rua é obrigatorio.'),
        body('addressNumber')
            .notEmpty()
            .withMessage('A Número é obrigatorio.'),
        body('addressDistrict')
            .notEmpty()
            .withMessage('O bairro é obrigatorio.'),
        body('addressCity')
            .notEmpty()
            .withMessage('O nome da cidade é obrigatório.'),
        body('addressState')
            .notEmpty()
            .withMessage('O nome do Estado é obrigatorio.'),
        ]       
}

module.exports = {
    userAddressCreateValidation,
}