const controllers = require('../controllers/')
const router = require('express').Router()
const auth = require('../utils/auth')

router.get('/', controllers.comment.get.getAll)
router.get('/:id', controllers.comment.get.getById)

module.exports = router
