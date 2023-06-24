const { defaultResponseHandler } = require("../helperMethods");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SALT;

const login = (req, res) => {
    if (
        req.body.username === process.env.USERNAME &&
        req.body.password === process.env.PASSWORD
    ) {
        const token = {token: generateToken()};
        defaultResponseHandler(res, token);
    }else{
        defaultResponseHandler(res, null, {message: 'Wrong Username or Password'})
    }
}

const generateToken = () =>{
    const token = jwt.sign({}, secretKey, { expiresIn: '24h' });
    return token;
}

module.exports = {
    login,
}
