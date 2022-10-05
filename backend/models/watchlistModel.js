const mongoose = require('mongoose')

const watchlistSchema = mongoose.Schema({
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
    wantToWatch: {
        type: Boolean,
        required: [true, 'Please add a to_watch bool']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Watchlist', watchlistSchema)