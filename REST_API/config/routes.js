const router = require('../routes/')
const path = require('path')

module.exports = (app) => {
    app.use('/api/user', router.user)
    app.use('/api/post', router.post)
    // app.use('*', (req, res, next) => res.send('<h1> Error 404 Not Found </h1>'))
    app.use('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, '../../build', 'index.html'))
    });
}