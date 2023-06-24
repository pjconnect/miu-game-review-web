require('dotenv').config();
require('./model/dbcontext')
const express = require('express');
const routes = require('./router/');

const app = express();
app.use(express.json())
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ORIGINS);
    res.setHeader('Access-Control-Allow-Methods', process.env.ACCESS_CONTROL_METHODS);
    res.setHeader('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_HEADERS);
    next();
});
app.use(process.env.ENDPOINT, routes);

const server = app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(displayWelcomeMessage(server))
})
const displayWelcomeMessage = (server) => {
    return process.env.BASE_URL + ":" + server.address().port;
}