const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {validate} = require('../middleware/validateMiddleware')
const { registerUser, loginUser , getMe, updateProfile, updatePassword, getSecurityQuestions ,setSecurityQuestions, compareSecurityAnswers} = require('../controllers/userController')

router.post('/', registerUser)
router.route('/compareAnswers').post(validate, compareSecurityAnswers)
router.route('/userQuestions').post(validate, getSecurityQuestions).put(protect, setSecurityQuestions)
router.post('/login', loginUser)
router.route('/me').get(protect, getMe).put(protect, updateProfile)
router.route('/updatePassword').put(protect, validate, updatePassword)

module.exports = router