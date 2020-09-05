const models = require('../models')
const config = require('../config/config')
const jwt = require('../utils/jwt')

module.exports = {
    get: {
        getAll: async (req, res, next) => {
            try {
                const users = await models.user.find()
                res.send(users)
            } catch {
                res.status(500).send("Error")
            }
        },
        getById: async (req, res, next) => {
            try {
                const user = await models.user.getById(req.body.id)
                    .populate("followers")
                    .populate("following")
                    .populate("requests")
                    .populate("posts")
                res.send(user)
            } catch {
                res.status(500).send("Error")
            }
        },
    },

    post: {
        register: async (req, res, next) => {
            const { email, username, password, rePassword } = req.body

            try {
                const user = await models.user.create({ email, username, password, rePassword })
                const token = jwt.createToken({ id: user._id })
                res.header('Authorization', token).send(user)
            } catch {
                return next
            }
        },
        login: async (req, res, next) => {
            const { email, password } = req.body

            try {
                const user = await models.user.findOne({ email })
                const match = await user.matchPassword(password)
                if (!match) {
                    res.status(401).send('Invalid password')
                    return
                }
                const token = jwt.createToken({ id: user._id })
                res.cookie(config.development.cookie, token).header('Authorization', token).send(user)
            } catch {
                return next
            }
        },
        logout: (req, res, next) => {
            res.clearCookie(config.authCookieName)
        }
    },

    put: {

    },

    delete: async (req, res, next) => {
        try {
            const user = await models.user.deleteOne({ _id: req.params.id })
            res.send(removedUser)
        } catch {
            return next
        }
    }
}