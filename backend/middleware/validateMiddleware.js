const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const validate = asyncHandler(async (req, res, next) => {
 const validEmail = /^[a-zA-Z0-9][a-zA-Z0-9-_\.\+]+@([a-zA-Z]|[a-zA-Z0-9]?[a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-zA-Z0-9]{2,10}(?:\.[a-zA-Z]{2,10})?$/
 const validPasswordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
 const validUserName = /^[A-Za-z0-9_]{4,25}$/
 const minSixCharsNoSpec = /^[\s-]*(?:\d[\s-]*){4}$/
    
    if(req.body){
        try{
            const { type, password, email } = req.body;
            if(type === 'password' && !validPasswordStrength.test(password)){
                console.log('BACKEND HERE')
                throw new Error('Please make a more complex password(Uppercase & Lowercase letters, minimum 7 characters, 1 Number & Special character')
            }
            if(type === 'email' && !validEmail.test(email)){
                throw new Error('Email Failed!')
            }

          next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error(error.message)
        }
    }
})

module.exports = { validate }