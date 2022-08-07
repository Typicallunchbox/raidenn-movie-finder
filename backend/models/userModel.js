const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        requierd: [true, 'Please add a name']
    },
    email:{
        type: String,
        requierd: [true, 'Please add an email'],
        unique: true
    },
    password:{
        type: String,
        requierd: [true, 'Please add a password']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)