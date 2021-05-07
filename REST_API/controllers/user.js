const models = require('../models')
const config = require('../config/config')
const jwt = require('../utils/jwt')
const bcrypt = require('bcrypt')

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
        getNotFollowedUsers: async (req, res, next) => {
            const notFollowedUsers = []
            try {
                const users = await models.user.find()
                users.forEach(user => {
                    if (!user.followers.includes(req.user.id)) {
                        if (JSON.stringify(req.user.id) !== JSON.stringify(user._id)) {
                            notFollowedUsers.push(user)
                        }
                    }
                })
                res.send(notFollowedUsers)
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
        searchUsers: async (req, res, next) => {
            const query = req.query.q;

            try {
                const users = await models.user.find({ "username": { "$regex": `${query}`, "$options": "i" } })
                if (users === null) {
                    return res.status(404).send({
                        message: "No users matching your criteria were found"
                    });
                }
                return res.send(users);
            } catch (error) {
                return res.status(500).send({
                    error: error.message
                });
            }
        },
    },

    post: {
        register: async (req, res, next) => {
            const { email, username, password, rePassword } = req.body

            if (email && username && password && password === rePassword) {
                try {
                    const userError = await models.user.findOne({ email })

                    if (userError) {
                        return res.status(401).send({ error: `User e-mail ${email} already exists` })
                    }

                    const user = await models.user.create({ email, username, password })
                    const token = jwt.createToken({ id: user._id })
                    res.header('Authorization', token).send(user)
                } catch (err) {
                    return res.status(500).send(err)
                }
            } else {
                res.status(401).send({ error: 'Please enter valid credentials' })
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
            if (email && password) {
                try {
                    const user = await models.user.findOne({ email })
                        .populate("post")
                        .populate("followers")
                        .populate("following")
                        .populate("requests")
                    const match = await user.matchPassword(password)
                    if (!match) {
                        res.status(401).send({ error: 'Invalid user e-mail or password!' })
                        return
                    }
                    const token = jwt.createToken({ id: user._id })
                    res.header('Authorization', token).send(user)
                } catch (err) {
                    next(err)
                }
            } else {
                res.status(401).send({ error: 'Please enter valid credentials' })
            }
        },
        logout: (req, res, next) => {
            res.clearCookie(config.development.cookie)
        }
    },

    put: {
        followUser: async (req, res, next) => {
            const { _id } = req.user
            const id = req.params.id
            try {
                await models.user.findByIdAndUpdate(id, { $addToSet: { followers: _id } })
                await models.user.findByIdAndUpdate(_id, { $addToSet: { following: id } })
                return res.send('Success!')
            } catch (err) {
                return res.status(500).send(err)
            }
        },
        unFollowUser: async (req, res, next) => {
            const { _id } = req.user
            const id = req.params.id;
            try {
                await models.user.findByIdAndUpdate(id, { $pull: { followers: _id } })
                await models.user.findByIdAndUpdate(_id, { $pull: { following: id } })
                return res.send('Success!')
            } catch (err) {
                return res.status(500).send(err)
            }
        },
        picture: async (req, res, next) => {
            const id = req.params.id;
            try {
                const picture = await models.user.findByIdAndUpdate({ _id: id }, { profilePicture: (req.body.picture) })
                return res.send(picture)
            } catch (err) {
                return res.status(500).send(err)
            }
        },
        editUser: async (req, res, next) => {
            const id = req.params.id;
            const { name, bio } = req.body
            try {
                const updatedUser = await models.user.findByIdAndUpdate({ _id: id }, {
                    username: name, description: bio
                })
                return res.send(updatedUser)
            } catch (err) {
                return res.status(500).send(err)
            }
        },
        changePassword: async (req, res) => {
            const { oldPassword, password, repeatPassword } = req.body

            if (oldPassword && password === repeatPassword) {
                try {
                    const token = req.headers.authorization || ''
                    const data = jwt.verifyToken(token)
                    const user = await models.user.findById(data.id)
                    const match = await user.matchPassword(oldPassword)

                    if (match) {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(password, salt)

                        user.password = hash;

                        await models.user.findByIdAndUpdate(data.id, user)
                        return res.clearCookie("auth-token").send({ message: "Password successfully changed!" })
                    } else {
                        return res.status(401).send({ error: "Wrong current password!" })
                    }
                } catch (error) {
                    return res.status(500).send(error)
                }
            } else {
                return res.status(401).send({ error: "Password and repeat password don't match!" })
            }
        }
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


