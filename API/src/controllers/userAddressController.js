const { UserAddress: UserAddressModel } = require('../models/UserAddress');

module.exports = class UserAddressController {

    static async getUserAdresses(req, res) {

        const { user } = req;

        !user && res.status(401).json({ errors: ['Por favor, efetue seu login novamente.']});

        try {
            
            const addresses = await UserAddressModel.find({ userId: user._id });
            res.status(200).json(addresses);

        } catch (error) {
            
            res.status(422).json({ errors: ['Houve algum problema na requisição, por favor tente novamente mais tarde.']});
        }
        
    }

    static async createUserAddress(req, res) {

        const { user } = req;

        !user && res.status(401).json({ errors: ['Por favor, efetue seu login novamente.']});

        const address = {
            addressType: req.body.addressType,
            addressZipcode: req.body.addressZipcode,
            addressStreet: req.body.addressStreet,
            addressNumber: req.body.addressNumber,
            addressDistrict: req.body.addressDistrict,
            addressCity: req.body.addressCity,
            addressState: req.body.addressState,
            userId: user._id,
        };

        if(req.body.addressComplement) {
            address.addressComplement = req.body.addressComplement;
        }

        try {

            const userAddress = await UserAddressModel.create(address);
            res.status(201).json(userAddress);
            
        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema na requisição, por favor tente novamente mais tarde.']});
            
        }
    }

    static async deleteAddress(req, res) {

        const { user } = req;
        const { id } = req.params;
        
        try {

            const address = await UserAddressModel.findById(id);

            if(!address) {
                res.status(404).json({ errors: ['Endereço não encontrado.']});
            }
            if(!address.userId.equals(user._id)) {
                res.status(422).json({ errors: ['Você não possui permissão para executar essa ação.']});
            }
            
            await UserAddressModel.deleteOne({ _id: id });
            res.status(200).json({ message: 'Endereço excluído com sucesso.' });

        } catch (error) {

            res.status(404).json({ errors: ['Endereço não encontrado, por favor tente mais tarde.']});
            
        }
    }

    static async getAddressByType(req, res) {

        const { type } = req.query;
        const { user } = req;

        try {
            
            const address = await UserAddressModel.find({ addressType: Number(type), userId: user._id });
            res.status(200).json(address);

        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema na requisição, por favor tente novamente mais tarde.']});
            
        }

    }

}