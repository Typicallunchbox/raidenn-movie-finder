const express = require('express')
const router = express.Router()
const { getWatched, getWantToWatch, getWatchlistByUserId, setWatched } = require('../controllers/watchlistController')
const {protect} = require('../middleware/authMiddleware')

router.route('/watched').get(protect, getWatched).post(protect, setWatched)
router.route('/wantToWatch').get(protect, getWantToWatch)
router.route('/').get(protect, getWatchlistByUserId)


module.exports = router