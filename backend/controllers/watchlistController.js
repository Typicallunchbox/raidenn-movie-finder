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

// @desc    Get entire watchlist for user
//@route    GET /api/watchlist
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
//@route    POST /api/watchlist
//@access   Private
const createWatchlistRecord = asyncHandler(async (req, res) => {
    const watchListRecord = await Watchlist.findOne({user_id: req.user.id, movie_id: req.body.movie_id});

    if (watchListRecord) {
        res.status(400);
        throw new Error("Movie already exists on list.");
    }
    
    if(!req.body.watched && !req.body.wantToWatch){
        res.status(400)
        throw new Error('Please add either a watched or wantToWatch field')
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
        watched : req.body.watched ? req.body.watched : false,
        wantToWatch : req.body.wantToWatch ? req.body.wantToWatch : false
    })
    res.status(200).json(comment) 
})


// @desc    Update goal
//@route    PUT /api/watchlist
//@access   Private
const updateWatchlistRecord = asyncHandler(async (req, res) => {
    const watchListRecord = await Watchlist.findById(req.body._id);

    if (!watchListRecord) {
        res.status(400);
        throw new Error("Movie does not exist on list.");
    }

    if(!req.body.watched && !req.body.wantToWatch){
        res.status(400)
        throw new Error('Please add either a watched or wantToWatch field to update')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(watchListRecord.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const updateWatchlist = await Watchlist.findByIdAndUpdate(req.body._id, req.body.watched ? {watched : req.body.watched} : {wantToWatch : req.body.wantToWatch}, {new : true})
    res.status(200).json(updateWatchlist) 
})


// @desc    Delete goal
//@route    DELETE /api/watchlist
//@access   Private
const deleteWatchlistRecord = asyncHandler(async (req, res) => {
    const watchListRecord = await Watchlist.findById(req.body._id);
    console.log('watchListRecord:', watchListRecord)

    if (!watchListRecord) {
        res.status(400);
        throw new Error("Movie does not exist on list.");
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(watchListRecord.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Watchlist.deleteOne(watchListRecord)
    res.status(200).json({id : req.body._id}) 
})


module.exports = {
 getWatched,
 getWantToWatch,
 getWatchlistByUserId,
 createWatchlistRecord,
 updateWatchlistRecord,
 deleteWatchlistRecord
}