const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const Comment = require('../models/commentModel')
const User = require('../models/userModel')


// @desc    Get comments
//@route    GET /api/comments
//@access   Private
const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find()
    res.status(200).json(comments) 
})

// @desc    Get comments for movie
//@route    GET /api/commentsForMovie
//@access   Private
const getCommentsByMovieId = asyncHandler(async (req, res) => {
    const movie_id = req.params.id
    const comments = await Comment.find({ movie_id })
    if(comments.length == 0){
        res.status(200).json([])
        return;
    }

    res.status(200).json(comments) 
})

// @desc    Set goal
//@route    POST /api/comments
//@access   Private
const setComment = asyncHandler(async (req, res) => {
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

    const comment = await Comment.create({
        user: req.user.id,
        username: req.user.name,
        comment : req.body.comment,
        movie_id : req.body.movie_id,
        rating : req.body.rating
    })
    res.status(200).json(comment) 
})

// @desc    Update goal
//@route    PUT /api/comments/:id
//@access   Private
const updateComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

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

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(200).json(updatedComment) 
})

// @desc    Delete goal
//@route    DELETE /api/comments/:id
//@access   Private
const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Comment not found')
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

    await Comment.deleteOne(comment)
    res.status(200).json({id : req.params.id}) 
})

module.exports = {
 getComments,
 getCommentsByMovieId,
 setComment,
 updateComment,
 deleteComment  
}