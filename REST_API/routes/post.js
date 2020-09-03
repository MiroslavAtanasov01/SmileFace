const controllers = require('../controllers/')
const router = require('express').Router()
const auth = require('../utils/auth')

router.get('/', controllers.post.get.getAll)
router.get('/:id', controllers.post.get.getById)

module.exports = router