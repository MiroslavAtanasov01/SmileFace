const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
    return mongoose.connect(config.development.databaseUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )
}