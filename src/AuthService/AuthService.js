const jwt = require("jsonwebtoken");

const AuthService = {
    getUser(db, email){
        return db.select("*").from("users").where({ email }).first();
    },
    verifyJwt(token){
        return jwt.verify(
            token,
            process.env.JWT_SECRET, {
                algorithms: ["HS256"]
            }
        );
    }
};

module.exports = AuthService;