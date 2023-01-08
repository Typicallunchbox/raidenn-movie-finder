const express = require('express')
const router = express.Router()
const { registerUser, loginUser , getMe, updateProfile, updatePassword} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const {validate} = require('../middleware/validateMiddleware')


router.post('/', registerUser)
router.post('/login', loginUser)
router.route('/me').get(protect, getMe).put(protect, updateProfile)
router.route('/updatePassword').put(protect, validate, updatePassword)

module.exports = router