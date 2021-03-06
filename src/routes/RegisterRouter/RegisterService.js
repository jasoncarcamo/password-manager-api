const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {JWT_SECRET}  = require("../../../config");

const RegisterService = {
    getUser(db, email){
        return db.select("*").from("users").where({email}).first();
    },
    insertUser(db, user){
        return db.insert(user).into("users").returning("*").then(([newUser]) => newUser);
    },
    hashPassword(password){
        return bcrypt.hash( password, 12);
    },
    createJwt(subject, payload){
        jwt
        return jwt.sign( payload, JWT_SECRET, {
            subject,
            algorithm: "HS256"
        });
    }
};

module.exports = RegisterService;