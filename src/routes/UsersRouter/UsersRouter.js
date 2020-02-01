const express = require("express");
const UsersRouter = express.Router();
const {requireAuth} = require("../../middleware/jwtAuth");

UsersRouter
    .route("/user")
    .all(express.json())
    .all(requireAuth)
    .get(( req, res)=>{
        //We have our user from our middleware, requireAuth
        
        return res.status(200).json({ 
            user : {
                id: req.user.id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email
        } })
    })

module.exports = UsersRouter;