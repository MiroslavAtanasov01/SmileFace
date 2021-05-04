const controllers = require('../controllers/')
const router = require('express').Router()
const auth = require('../utils/auth')

router.get('/', auth(), controllers.post.get.getPostsExplore)
router.get('/posts', auth(), controllers.post.get.getPosts)
router.get('/search', controllers.user.get.searchUsers)

router.get('/details/:id', controllers.post.get.getImage)

router.post('/', auth(), controllers.post.post)

router.put('/edit/:id', auth(), controllers.post.put.editPost)
router.put('/like', auth(), controllers.post.put.like)
router.put('/unlike', auth(), controllers.post.put.unlike)
router.put('/postComment', auth(), controllers.post.put.postComment)

router.delete('/delete/:id', auth(), controllers.post.deletePost)

module.exports = router
