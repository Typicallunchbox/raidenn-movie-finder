const express = require('express')
const router = express.Router()
const { getWatched, getWantToWatch, getWatchlistByUserId, createWatchlistRecord, updateWatchlistRecord, deleteWatchlistRecord } = require('../controllers/watchlistController')
const {protect} = require('../middleware/authMiddleware')

router.route('/watched').get(protect, getWatched)
router.route('/wantToWatch').get(protect, getWantToWatch)
router.route('/').get(protect, getWatchlistByUserId).post(protect, createWatchlistRecord).put(protect, updateWatchlistRecord).delete(protect, deleteWatchlistRecord)


module.exports = router