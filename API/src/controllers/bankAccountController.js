const { BankAccount: BankAccountModel } = require('../models/BankAccount');

module.exports = class BankAccountController {

    static async getBankAccounts(req, res) {

        const { user } = req;

        try {
            
            const accounts = await BankAccountModel.find({ userId: user._id });
            
            !accounts && res.status(404).json({ errors: ['Nenhum conta bancária cadastrada.']});

            res.status(200).json(accounts);

        } catch (error) {
            
            res.status(422).json({ errors: ['Houve algum erro na requisição, por favor tente novamente mais tarde.']});
        }
    }

    static async registerBankAccount(req, res) {

        const { user } = req;
        const { bankName, bankAgency, bankAccount, bankPix } = req.body;

        const newBankAccount = {
            bankName, bankAgency, bankAccount, bankPix, userId: user._id
        }

        try {
            
            const account = await BankAccountModel.create(newBankAccount);
            res.status(201).json(account);

        } catch (error) {
            
            res.status(422).json({ errors: ['Houve algum erro na requisição, por favor tente novamente mais tarde.']});

        }
    }

    static async deleteBankAccount(req, res) {

        const { user } = req;
        const { id } = req.params;

        const account = await BankAccountModel.findById(id);

        if(!account.userId.equals(user._id)){
            res.status(422).json({ errors: ['Você não possui permissão para executar essa ação.']});
        }

        try {

            await BankAccountModel.findByIdAndDelete(account._id);
            res.status(200).json({id: account._id, message: "Conta excluída com sucesso."});
            
        } catch (error) {

            res.status(422).json({ errors: ['Houve algum erro na requisição, por favor tente novamente mais tarde.']});

        }


    }
}