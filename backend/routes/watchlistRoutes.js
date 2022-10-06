const express = require('express')
const router = express.Router()
const { getWatched, getWantToWatch, getWatchlistByUserId, setWatchProps, updateWatchProps, deleteWatchProps } = require('../controllers/watchlistController')
const {protect} = require('../middleware/authMiddleware')

router.route('/watched').get(protect, getWatched)
router.route('/wantToWatch').get(protect, getWantToWatch)
router.route('/').get(protect, getWatchlistByUserId).post(protect, setWatchProps).put(protect, updateWatchProps).delete(protect, deleteWatchProps)


module.exports = router