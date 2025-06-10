const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');

//login callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email });
    
        if (!user) {
            return res.status(404).send('User Not Found')
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid Email or Password');
        }
        res.status(200).json({
            success: true,
            user: { ...user._doc, password: undefined },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

//register callback
const registerController = async (req, res) => {

    try{
        const existingUser = await userModel.findOne({ email : req.body.email });
        if(existingUser) {
            return res.status(400).json({ success:  false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new userModel({
            ...req.body,
            password: hashedPassword,
        });

        
        await newUser.save();

        res.status(201).json({
            success:true,
            user: { ...newUser._doc, password: undefined },
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            error,
        })
    }
};

module.exports = { loginController, registerController };