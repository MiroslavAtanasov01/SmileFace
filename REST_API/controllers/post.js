const models = require('../models')

module.exports = {
    get: {
        getPostsExplore: async (req, res, next) => {
            const postsToExplore = []
            const user = await models.user.findById(req.user.id)
            const posts = await models.post.find()

            posts.forEach(post => {
                if (!user.following.includes(post.postedBy)) {
                    if (JSON.stringify(post.postedBy) !== JSON.stringify(req.user._id)) {
                        postsToExplore.push(post)
                    }
                }
            })

            const sorted = postsToExplore.sort((a, b) => b.createdAt - a.createdAt)
            return res.send(sorted)
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
                            populate: { path: "postedBy" },
                        }
                    }
                });

            user.following.forEach(user => {
                user.posts.forEach(post => {
                    posts.push(post)
                })
            })

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
        like: async (req, res, next) => {
            const { _id } = req.user
            const id = req.body.postId
            try {
                await models.post.findByIdAndUpdate(id, { $addToSet: { likes: _id } })
                return res.send('Success!')
            } catch (err) {
                return res.status(500).send(err)
            }
        },
        unlike: async (req, res, next) => {
            const { _id } = req.user
            const id = req.body.postId
            try {
                await models.post.findByIdAndUpdate(id, { $pull: { likes: _id } })
                return res.send('Success!')
            } catch (err) {
                return res.status(500).send(err)
            }
        },
        postComment: async (req, res, next) => {
            const { comment, postId } = req.body
            const { _id } = req.user

            try {
                const newComment = await models.comment.create({ comment, createdAt: Date.now(), postedBy: { _id } })
                const post = await models.post.findByIdAndUpdate(postId, { $addToSet: { comments: newComment._id } })
                return res.send(newComment, post)
            } catch (err) {
                return res.status(500).send(err)
            }
        },
    },

    delete: {

    }
}