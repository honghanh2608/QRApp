const jwt = require('jsonwebtoken');

function isValidToken(token, permission = undefined) {
    if (!token) {
        return "Couldn't find access token";
    }
    try {
        let decode = jwt.verify(token, "vietnam");
        if (permission && decode.permission !== permission) {
            return "Permission denied";
        }
        let exp = decode.exp;
        if (exp < (Date.now() / 1000)) {
            return "Token has expired"
        }
    } catch (e) {
        return "Token is not valid";
    }
}

function isValidTokenExcept(token, permission) {
    if (!token) {
        return "Couldn't find access token";
    }
    try {
        let decode = jwt.verify(token, "vietnam");
        if (permission && decode.permission === permission) {
            return "Permission denied";
        }
        let exp = decode.exp;
        if (exp < (Date.now() / 1000)) {
            return "Token has expired"
        }
    } catch (e) {
        return "Token is not valid";
    }
}

function verifyToken(token) {
    return jwt.verify(token, "vietnam");
}

module.exports = {
    isValidToken,
    isValidTokenExcept,
    verifyToken
};
