const { UserAccount: UserAccountModel } = require('../models/UserAccount');
const bcrypt = require('bcryptjs');
const generateToken = require('../helpers/generate-token');

module.exports = class UserAccountController {

    static async getUser(req, res) {
        res.status(200).json({
            message: "Cheguei"
        })
    }

    static async newUser(req, res) {
        
        const { name, email, phone, password } = req.body;

        const userTest = await UserAccountModel.findOne({ email });
        if(userTest) return res.status(422).json({ errors: ['Por favor, utilize outro e-mail para criar uma conta.']});

        // Password Hash
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const data = {
            name,
            email,
            phone,
            password: passwordHash
        }

        try {

            const user = await UserAccountModel.create(data);
            res.status(201).json(user);
            
        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema no registro do usuário.'] });

        }

    }

    static async loginUser(req, res) {

        const { email, password } = req.body;

        // Check if user exists
        const user = await UserAccountModel.findOne({ email });
        if(!user) return res.status(401).json({ errors: ['Usuário não encontrado.']});

        // Check password
        if(!(await bcrypt.compare(password, user.password))) return res.status(401).json({ errors: ['Senha incorreta.']});

        try {

            res.status(200).json({ token: generateToken(user._id)});
            
        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema ao fazer o login.'] });
            
        }

    }
    static async deleteUser(req, res) {

        const { user } = req;
        
        !user && res.status(404).json({ errors: ['Você não tem autorização para executar essa ação.']});

        try {
            
            await UserAccountModel.deleteOne({ _id: user._id });
            res.status(200).json({ message: 'Conta excluída com sucesso.' });

        } catch (error) {

            res.status(422).json({ errors: ['Houve algum problema na requisição, por favor tente mais tarde.']});
            
        }

    }
    static async updateUser(req, res) {

        // console.log(req.file);

        const { user } = req;
        const { 
            name, 
            email, 
            phone,
            passwordActual, 
            newPassword,
            zipcode,
            address,
            address_number,
            complement,
            district,
            city,
            state,
        } = req.body;

        let img = null;
        
        !user && res.status(404).json({ errors: ['Você não tem autorização para executar essa ação.']});
        
        if(req.file) {
            img = req.file.filename;
        }
        
        let newUser = {
            name,
            email,
            phone,
        };
        
        if(passwordActual) {
            
            // Check actual password
            !(await bcrypt.compare(passwordActual, user.password)) && res.status(401).json({ errors: ['Sua senha atual está incorreta.']});

            // Password Hash
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(newPassword, salt);

            newUser.password = passwordHash;

        }
        if(img) {
            newUser.image = img;
        }

        if(zipcode) {

            if(!address || !address_number || !district || !city || !state) {
                return res.status(422).json({ errors: ['Por favor, preencha todos os campos de endereço.']});
            }

            newUser.zipcode = zipcode;
            newUser.address = address;
            newUser.address_number = address_number;
            newUser.district = district;
            newUser.city = city;
            newUser.state = state;

            if(complement) { 
                newUser.complement = complement; 
            }
        }

        res.status(200).json(newUser);


    }
}