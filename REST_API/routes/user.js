const controllers = require('../controllers/')
const router = require('express').Router()

router.get('/', controllers.user.get.getAll)
router.get('/:id', controllers.user.get.getById)


module.exports = router
