const models = require('../models')

module.exports = {
    get: {
        getAll: async (req, res, next) => {
            try {
                const posts = await models.post.find()
                    .populate('postedBy')
                    .populate('likes')
                    .populate('comments')
                res.send(posts)
            } catch {
                res.status(500).send("Error")
            }
        },
        getPosts: async (req, res, next) => {
            const posts = []
            const id = req.user.id
            const user = await models.user.findById(id)
                .populate({
                    path: "following",
                    populate: {
                        path: "posts",
                        populate: {
                            path: "postedBy comments",
                            populate: {
                                path: "postedBy"
                            }
                        }
                    }
                });

            user.following.forEach(user => {
                user.posts.forEach(post => {
                    posts.push(post);
                });
            });

            const sorted = posts.sort((a, b) => b.createdAt - a.createdAt)
            return res.send(sorted)
        },
        getImage: async (req, res, next) => {
            try {
                const image = await models.post.findById(req.params.id)
                    .populate('postedBy')
                    .populate('likes')
                    .populate('comments')
                res.send(image)
            } catch (err) {
                res.status(500).send(err)
            }
        }
    },

    post: async (req, res, next) => {
        const { description, imageUrl, location } = req.body
        const { _id } = req.user

        try {
            const newPost = await models.post.create({ description, imageUrl, location, createdAt: Date.now(), postedBy: { _id } })
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