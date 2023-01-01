const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Watchlist = require('../models/watchlistModel')

// @desc    Get watched
//@route    GET /api/watchlist/watched
//@access   Private
const getWatched = asyncHandler(async (req, res) => {
    const watchlist = await Watchlist.find({user: req.user._id, watched: true})
    res.status(200).json(watchlist) 
})

// @desc    Get wantToWatch
//@route    GET /api/watchlist/wantToWatch
//@access   Private
const getWantToWatch = asyncHandler(async (req, res) => {
    const watchlist = await Watchlist.find({user: req.user._id, wantToWatch: true})
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

// @desc    Update goal
//@route    PUT /api/watchlist
//@access   Private
const getWantToWatchRecord = asyncHandler(async (req, res) => {
    console.log('req movie:', req.body)
    let movie_id = null;
    movie_id = req.body.movie_id;
    const watchListRecord = await Watchlist.findOne({user_id: req.user.id, movie_id: movie_id});

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
    
    res.status(200).json(watchListRecord) 
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

    if(!req.body.movie_genre || req.body.movie_genre.length == 0){
        res.status(400)
        throw new Error('Please provide atleast one genre for the movie_genre field')
    }

    if(!req.body.movie_image){
        res.status(400)
        throw new Error('Please provide movie_image field')
    }

    const comment = await Watchlist.create({
        user: req.user.id,
        movie_id : req.body.movie_id,
        movie_genre : req.body.movie_genre,
        movie_image: req.body.movie_image,
        watched : req.body.watched ? req.body.watched : false,
        wantToWatch : req.body.wantToWatch ? req.body.wantToWatch : false
    })
    res.status(200).json(comment) 
})


// @desc    Update goal
//@route    PUT /api/watchlist
//@access   Private
const updateWatchlistRecord = asyncHandler(async (req, res) => {
    if(req.body.movie.createdAt) delete req.body.movie.createdAt
    if(req.body.movie.updatedAt) delete delete req.body.movie.updatedAt
    if(req.body.movie.__v) delete delete req.body.movie.__v

    const {movie} = req.body
    const watchListRecord = await Watchlist.findOne({movie_id : movie.movie_id, user_id : req.user.id});
    // const watchListRecord = await Watchlist.findById(movie._id);
    if(movie.watched === undefined && movie.wantToWatch === undefined){
        res.status(400)
        throw new Error('Please add either a watched or wantToWatch field to update')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // console.log('watchListRecord:', watchListRecord)
    if(watchListRecord){
        if(!movie.watched && !movie.wantToWatch){
            //Make sure the logged in user matches the goal user
            if(watchListRecord.user.toString() !== req.user.id){
                res.status(401)
                throw new Error('User not authorized')
            }
    
            await Watchlist.deleteOne(watchListRecord)
            res.status(200).json({id : movie._id})
            return;
        }

        //Make sure the logged in user matches the goal user
        if(watchListRecord.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('User not authorized')
        }
        
        const updateWatchlist = await Watchlist.findByIdAndUpdate(watchListRecord._id, {watched : movie.watched, wantToWatch : movie.wantToWatch} , {new : true})
        res.status(200).json(updateWatchlist)
        return;
    }
    const record = await Watchlist.create({
        user: req.user.id,
        movie_id : movie.movie_id,
        movie_genre : movie.movie_genre,
        movie_image: movie.movie_image,
        watched : movie.watched ? movie.watched : false,
        wantToWatch : movie.wantToWatch ? movie.wantToWatch : false
    })
    res.status(200).json(record) 
})


// @desc    Delete goal
//@route    DELETE /api/watchlist
//@access   Private
const deleteWatchlistRecord = asyncHandler(async (req, res) => {
    const watchListRecord = await Watchlist.findById(req.body._id);

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
 getWantToWatchRecord,
 getWatchlistByUserId,
 createWatchlistRecord,
 updateWatchlistRecord,
 deleteWatchlistRecord
}