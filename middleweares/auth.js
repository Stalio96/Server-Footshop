//const { verifySession } = require("../services/user");
//const { setUser } = require("../utils/storage");
//
//module.exports = () => (req, res, next) => {
//    const token = req.headers['x-authorization'];
//
//    try {
//        if(token){
//            console.log(token)
//            const userData = verifySession(token);
//            console.log(userData);
//            //setUser(userData);
//        }
//        next();
//    } catch (err) {
//        res.status(498).json({ message: 'Invalid access token. Please sign in' });
//    }
//}

function userSession() {
    return (req, res, next) => {
        if (req.session.user) {
            res.locals.user = req.session.user;
            res.locals.hasUser = true;
        }
        next();
    }
}

module.exports = userSession;