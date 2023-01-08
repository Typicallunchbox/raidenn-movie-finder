const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const validate = asyncHandler(async (req, res, next) => {
 const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
 const validPasswordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    
    if(req.body){
        try{
            const { type, password, email } = req.body;
            if(type === 'password' && !validPasswordStrength.test(password)){
                throw new Error('Please make a more complex password(Uppercase & Lowercase letters, minimum 7 characters, 1 Number & Special character')
            }
            if(type === 'email' && !validEmail.test(email)){
                throw new Error('Email Failed!')
            }

          next()
        }catch(error){
            res.status(200).json({error : error.message})
        }
    }
})

module.exports = { validate }