//Add to watched movies
//Add the to_watch movies
//Get watched movies based on user ID
//Get to_watch movies based on user ID
//Get both watched and to_watch movies on user ID
//Edit or Delete watched or to_watch record based on user ID
//Movie can have both true values for watched and to_watch

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Watchlist = require('../models/watchlistModel')



// @desc    Get watched
//@route    GET /api/watchlist/watched
//@access   Private
const getWatched = asyncHandler(async (req, res) => {
    const watchlist = await Watchlist.find({user_id: req.user.id, watched: true})
    res.status(200).json(watchlist) 
})

// @desc    Get wantToWatch
//@route    GET /api/watchlist/wantToWatch
//@access   Private
const getWantToWatch = asyncHandler(async (req, res) => {
    const watchlist = await Watchlist.find({user_id: req.user.id, wantToWatch: true})
    res.status(200).json(watchlist) 
})

// @desc    Get comments for movie
//@route    GET /api/commentsForMovie
//@access   Private
const getWatchlistByUserId = asyncHandler(async (req, res) => {
    const watchlist = await Watchlist.find({ user_id: req.user.id })
    if(watchlist.length == 0){
        res.status(400)
        throw new Error('No watchlist found')
    }

    res.status(200).json(watchlist) 
})

// @desc    Set Watched
//@route    POST /api/watchlist/watched
//@access   Private
const setWatched = asyncHandler(async (req, res) => {
    const watchedExists = await Watchlist.findOne({user_id: req.user.id, movie_id: req.body.movie_id});

    if (watchedExists) {
        res.status(400);
        throw new Error("Movie already exists on watched list.");
    }
    
    if(!req.body.watched){
        res.status(400)
        throw new Error('Please add a watched field')
    }

    if(!req.user.id){
        res.status(400)
        throw new Error('Invalid User field')
    }

    if(!req.body.movie_id){
        res.status(400)
        throw new Error('Please provide movie_id field')
    }

    const comment = await Watchlist.create({
        user: req.user.id,
        movie_id : req.body.movie_id,
        watched : req.body.watched,
        wantToWatch : req.body.wantToWatch
    })
    res.status(200).json(comment) 
})

// @desc    Set goal
//@route    POST /api/comments
//@access   Private
const setWantToWatch = asyncHandler(async (req, res) => {
    if(!req.body.comment){
        res.status(400)
        throw new Error('Please add a comment field')
    }
    if(!req.body.rating){
        res.status(400)
        throw new Error('Please add a rating field')
    }

    if(!req.body.movie_id){
        res.status(400)
        throw new Error('Please provide movie_id field')
    }

    const comment = await Watchlist.create({
        user: req.user.id,
        comment : req.body.comment,
        movie_id : req.body.movie_id,
        rating : req.body.rating
    })
    res.status(200).json(comment) 
})

// @desc    Update goal
//@route    PUT /api/comments/:id
//@access   Private
const updateWatched = asyncHandler(async (req, res) => {
    const comment = await Watchlist.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Goal not found')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(comment.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedComment = await Watchlist.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(200).json(updatedComment) 
})

// @desc    Update goal
//@route    PUT /api/comments/:id
//@access   Private
const updateWantToWatch = asyncHandler(async (req, res) => {
    const comment = await Watchlist.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Goal not found')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(comment.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedComment = await Watchlist.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(200).json(updatedComment) 
})

// @desc    Delete goal
//@route    DELETE /api/comments/:id
//@access   Private
const deleteWatched = asyncHandler(async (req, res) => {
    const comment = await Watchlist.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Watchlist not found')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(comment.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Watchlist.deleteOne(comment)
    res.status(200).json({id : req.params.id}) 
})

// @desc    Delete goal
//@route    DELETE /api/comments/:id
//@access   Private
const deleteWantToWatch = asyncHandler(async (req, res) => {
    const comment = await Watchlist.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Watchlist not found')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(comment.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Watchlist.deleteOne(comment)
    res.status(200).json({id : req.params.id}) 
})

module.exports = {
 getWatched,
 getWantToWatch,
 getWatchlistByUserId,
 setWatched,
 setWantToWatch,
 updateWatched,
 updateWantToWatch,
 deleteWatched,
 deleteWantToWatch  
}