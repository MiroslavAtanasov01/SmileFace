require('dotenv').config()
const env = process.env.NODE_ENV || 'development'


require('./config/database')().then(() => {
    const config = require('./config/config')[env]
    const app = require('express')()

    require('./config/express')(app)
    require('./config/routes')(app)

    app.listen(process.env.PORT || 3333, console.log(`Listening on port ${process.env.PORT || 3333}! Now its up to you...`))

}).catch(console.error)