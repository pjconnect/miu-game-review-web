const mongoose = require('mongoose');
require('./gameModel');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URL);
mongoose.connection.on("connected", function (abc, c) {
    console.log('mongoose connected')
})
mongoose.connection.on("error", function (err) {
    console.error('mongoose error', err);
})
