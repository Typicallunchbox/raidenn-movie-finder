const router = express.Router()
const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const { getWatched, getWantToWatchRecord, getWantToWatch, getWatchlistByUserId, createWatchlistRecord, updateWatchlistRecord, deleteWatchlistRecord } = require('../controllers/watchlistController')

router.route('/watched').get(protect, getWatched)
router.route('/wantToWatch').get(protect, getWantToWatch)
router.route('/wantToWatchRecord').post(protect, getWantToWatchRecord)
router.route('/').get(protect, getWatchlistByUserId).post(protect, createWatchlistRecord).put(protect, updateWatchlistRecord).delete(protect, deleteWatchlistRecord)


module.exports = router