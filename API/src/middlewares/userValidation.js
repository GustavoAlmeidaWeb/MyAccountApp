const { body } = require('express-validator');

const userCreateValidation = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('O nome é obrigatório.')
            .isLength({ min: 3 })
            .withMessage('O nome precisa ter no mínimo 3 caracteres.'),
        body('email')
            .notEmpty()
            .withMessage('O e-mail é obrigatorio.')
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('phone')
            .notEmpty()
            .withMessage('O telefone é obrigatorio.')
            .isLength({ min: 10 })
            .withMessage('Insira um telefone válido'),
        body('password')
            .notEmpty()
            .withMessage('A senha é obrigatoria.')
            .isLength({ min: 5 })
            .withMessage('A senha precisa ter no minimo 5 caracteres.'),
        body('confirmpassword')
            .notEmpty()
            .withMessage('A confirmação da senha é obrigatoria.')
            .custom((value, {req}) => {
                if(value !== req.body.password){
                    throw new Error('As senhas não são iguais.')
                }
                return true;
            }),
        ]       
}

const userUpdateValidation = () => {
    return [
        body('name')
            .optional()
            .isLength({ min: 3 })
            .withMessage('O nome precisa ter no mínimo 3 caracteres.'),
        body('email')
            .optional()
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('phone')
            .optional()
            .isLength({ min: 10 })
            .withMessage('Insira um telefone válido'),
        body('currentPassword')
            .optional()
            .isLength({ min: 5 })
            .withMessage('Por favor digite sua senha atual.')
            .custom((value, {req}) => {
                if(value === req.body.newPassword || value === req.body.confirmNewPassword) {
                     throw new Error('A nova senha não podem ser igual a atual.');
                }
                if(value && !req.body.newPassword) {
                    throw new Error('Por favor, digite a nova senha.');
                }
                return true;
            }),
        body('newPassword')
            .optional()
            .isLength({ min: 5 })
            .withMessage('A nova senha precisa ter no minimo 5 caracteres.')
            .custom((value, {req}) => {

                if(value && !req.body.currentPassword) {
                    throw new Error('Por favor, digite a senha atual.');
                }
                if(value && !req.body.confirmNewPassword) {
                    throw new Error('Por favor, digite a confirmação da senha.');
                }
                if(value !== req.body.confirmNewPassword) {
                    throw new Error('A nova senha e a confirmação não são iguais.')
                }
                return true;
            }),
        body('confirmNewPassword')
            .optional()
            .isLength({ min: 5 })
            .withMessage('A confirmação de senha precisa ter no minimo 5 caracteres.')
            .custom((value, {req}) => {

                if(value && !req.body.newPassword) {
                    throw new Error('Por favor, digite a senha atual.');
                }
                if(value && !req.body.currentPassword) {
                    throw new Error('Por favor, digite a senha atual.');
                }            
                return true;
            }),
        ]       
}

const userLoginValidation = () => {
    return [
        body('email')
            .notEmpty()
            .withMessage('O e-mail é obrigatorio.')
            .isEmail()
            .withMessage('Insira um e-mail válido'),
        body('password')
            .notEmpty()
            .withMessage('A senha é obrigatoria.')
            .isLength({ min: 5 })
            .withMessage('A senha precisa ter no minimo 5 caracteres.'),
        ]       
}

module.exports = {
    userCreateValidation,
    userUpdateValidation,
    userLoginValidation,
}