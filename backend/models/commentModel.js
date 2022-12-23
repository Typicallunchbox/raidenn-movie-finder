const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username:{
        type: String,
        required: [true, 'Please add an username reference']
    },
    movie_id:{
        type: String,
        required: [true, 'Please add a movie reference']
    },
    rating:{
        type: Number,
        required: [true, 'Please rate the movie']
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)