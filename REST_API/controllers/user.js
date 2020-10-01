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
                const user = await models.user.findById(req.params.id)
                    .populate({
                        path: "posts",
                        options: { sort: { createdAt: -1 } }
                    })
                    .populate("followers")
                    .populate("following")
                    .populate("requests")
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
        verify: async (req, res, next) => {
            try {
                const token = req.headers.authorization || ''
                const data = await jwt.verifyToken(token)
                const user = await models.user.findById(data.id)
                res.send({ status: true, user })
            } catch (error) {
                res.send({ status: false })
            }
        },
        login: async (req, res, next) => {
            const { email, password } = req.body
            try {
                const user = await models.user.findOne({ email })
                    .populate("post")
                    .populate("followers")
                    .populate("following")
                    .populate("requests")
                const match = await user.matchPassword(password)
                if (!match) {
                    res.status(401).send('Invalid password')
                    return
                }
                const token = jwt.createToken({ id: user._id })
                res.header('Authorization', token).send(user)
            } catch (err) {
                next(err)
            }
        },
        logout: (req, res, next) => {
            res.clearCookie(config.development.cookie)
        }
    },

    put: {
        followUser: async (req, res, next) => {
            const { _id } = req.user
            const id = req.params.id;
            try {
                await models.user.findByIdAndUpdate(id, { $addToSet: { followers: _id } })
                await models.user.findByIdAndUpdate(_id, { $addToSet: { following: id } })
                return res.send('Success!')
            } catch (err) {
                return res.status(500).send(err)
            }
        },
        picture: (req, res, next) => {
            const id = req.params.id;
            models.user.findByIdAndUpdate({ _id: id }, { profilePicture: (req.body.picture) })
                .then((updatedUser) => res.send(updatedUser))
                .catch(next)
        },
    },

    delete: async (req, res, next) => {
        try {
            const user = await models.user.deleteOne({ _id: req.params.id })
            res.send(user)
        } catch {
            return next
        }
    }
}