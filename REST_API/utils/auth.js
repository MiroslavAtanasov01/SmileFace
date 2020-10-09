const jwt = require('./jwt')
const models = require('../models')

const auth = (redirectUnauthenticated = true) => {
    return async function (req, res, next) {
        try {
            const token = req.headers.authorization || '';
            const data = jwt.verifyToken(token)
            const user = await models.user.findById(data.id)
            req.user = user
            next()
        } catch (err) {
            next(err)
        }
    };
}

module.exports = auth