const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    movie_id:{
        type: String,
        required: [true, 'Please add a movie reference']
    },
    watched:{
        type: Boolean,
        required: [true, 'Please add a watched bool']
    },
    to_watch: {
        type: Boolean,
        required: [true, 'Please add a to_watch bool']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)