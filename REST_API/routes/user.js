const controllers = require('../controllers/')
const router = require('express').Router()
const auth = require('../utils/auth')

router.get('/', controllers.user.get.getAll)
router.get('/getNotFollowedUsers', auth(), controllers.user.get.getNotFollowedUsers)
router.get('/:id', controllers.user.get.getById)
// router.get('/search', controllers.user.get.searchUsers)

router.post('/register', controllers.user.post.register)
router.post('/login', controllers.user.post.login)
router.post('/verify', controllers.user.post.verify)
router.post('/logout', controllers.user.post.logout)

router.put('/picture/:id', controllers.user.put.picture)
router.put('/follow/:id', auth(), controllers.user.put.followUser)
router.put('/unFollow/:id', auth(), controllers.user.put.unFollowUser)
router.put('/edit/:id', auth(), controllers.user.put.editUser)
router.put('/changePassword', auth(), controllers.user.put.changePassword)

router.delete('/:id', controllers.user.delete)


module.exports = router
