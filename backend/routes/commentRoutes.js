const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const { getComments, getCommentsByMovieId, setComment, updateComment, deleteComment } = require('../controllers/commentController')

router.route('/').get(protect,getComments).post(protect, setComment)
router.route('/movieId/:id').get(protect,getCommentsByMovieId)
router.route('/:id').put(protect, updateComment).delete(protect, deleteComment)

module.exports = router