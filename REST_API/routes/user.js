const controllers = require('../controllers/')
const router = require('express').Router()
const auth = require('../utils/auth')

router.get('/', controllers.user.get.getAll)
router.get('/:id', controllers.user.get.getById)

router.post('/register', controllers.user.post.register)
router.post('/login', controllers.user.post.login)
router.post('/verify', controllers.user.post.verify)
router.post('/logout', controllers.user.post.logout)

router.put('/picture/:id', controllers.user.put.picture)
router.put('/followUser/:id', auth(), controllers.user.put.followUser)

router.delete('/:id', controllers.user.delete)


module.exports = router
