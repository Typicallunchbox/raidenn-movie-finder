const express = require('express')
const router = express.Router()
const { getComments, getCommentsForMovie, setComment, updateComment, deleteComment } = require('../controllers/commentController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getComments).get(protect,getCommentsForMovie).post(protect, setComment)
router.route('/:id').put(protect, updateComment).delete(protect, deleteComment)

module.exports = router