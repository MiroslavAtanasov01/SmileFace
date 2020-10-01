const controllers = require('../controllers/')
const router = require('express').Router()
const auth = require('../utils/auth')

router.get('/', controllers.post.get.getAll)
router.get('/posts', auth(), controllers.post.get.getPosts)

router.post('/', auth(), controllers.post.post)

module.exports = router
