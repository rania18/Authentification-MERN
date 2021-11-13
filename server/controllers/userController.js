const User = require('../models/userSchema.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const registerController = async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.mapped() });
        }
        const { email, password, fullName } = req.body;
        const existUser = await User.findOne({ email });
        if ( existUser ) {
            res.status(400).json({msg: 'User already exist!!' })
        }
        const hashePassword = await bcrypt.hash( password, 10 );
        const newUser = await User.create({ email, fullName, password: hashePassword });
        const token = jwt.sign(
            { fullName:newUser.fullName, email:newUser.email, id:newUser._id }, 
            process.env.SECRET_KEY,
            { expiresIn: '1d'}
        )
        res.json({ newUser, token });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const loginController = async (req,res) => {
    try {
        const { email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (!existUser) {
            res.status(400).json({msg: 'You must register first !'});
        }
        const validatePassword = await bcrypt.compare( password, existUser.password )
        if (!validatePassword) {
            res.status(400).json({msg: 'Wrong password!  Try again!'});
        }    
        const token = jwt.sign(
            { id: existUser._id, email: existUser.email },
            process.env.SECRET_KEY
        )
        res.json({ user:existUser, token })
    } catch (error) {
        //  res.status(500).json({ msg: error })
    }
}
module.exports = {registerController, loginController}