const jwt = require("jsonwebtoken");
const keys = require("../config/keys");


const loginSuccess = (req, res) => {
    var token = jwt.sign({
        sub: req.user._id
    }, keys.googleClientSecret);
    res.cookie("jwt", token);
    res.redirect("/dashboard?=");
}

const logout = (req, res) => {
    req.logout();
    res.cookie("jwt", null, {
        maxAge: -1
    });
    res.redirect("/dashboard");
}


module.exports = {
    loginSuccess,
    logout
}