const controllers = require('../controllers/')
const router = require('express').Router()
const auth = require('../utils/auth')

router.get('/', auth(), controllers.post.get.getPostsExplore)
router.get('/posts', auth(), controllers.post.get.getPosts)

router.get('/details/:id', controllers.post.get.getImage)

router.post('/', auth(), controllers.post.post)

router.put('/like', auth(), controllers.post.put.like)
router.put('/unlike', auth(), controllers.post.put.unlike)
router.put('/postComment', auth(), controllers.post.put.postComment)

module.exports = router
