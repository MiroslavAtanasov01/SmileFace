const models = require('../models')

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
            const newPost = await models.post.create({ description, imageUrl, location, createdAt: Date.now(), postedBy: _id })
            const post = await models.user.updateOne({ _id }, { $push: { posts: newPost } })
            const user = await models.post.findOne({ _id: newPost._id })
            return res.send(post, user)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    put: {

    },

    delete: {

    }
}