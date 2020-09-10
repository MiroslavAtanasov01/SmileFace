const models = require('../models')
const jwt = require('../utils/jwt');
const config = require('../config/config')


module.exports = {
    get: {
        getAll: async (req, res, next) => {
            try {
                const users = await models.post.find()
                res.send(posts)
            } catch {
                res.status(500).send("Error")
            }
        },
        getById: (req, res, next) => {

        },
    },

    post: async (req, res, next) => {
        const { description, imageUrl, location } = req.body;
        const { _id } = req.user;

        try {
            const newPost = await models.post.create({
                description, imageUrl, location, createdAt: Date.now(), postedBy: { _id }
            })
            const post = await models.user.updateOne({ _id }, { $addToSet: { posts: newPost } })
            return res.send(post)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    put: {

    },

    delete: {

    }
}