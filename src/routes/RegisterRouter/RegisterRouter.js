const express = require("express");
const RegisterRouter = express.Router();
const RegisterService = require("./RegisterService");

RegisterRouter
    .route("/register")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .post(( req, res)=>{
        const {
            email,
            password
        } = req.body;

        const newUser = {
            email,
            password
        };

        for( const [key, value] of Object.entries(newUser)){
            if( value == undefined){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };
        };

        RegisterService.getUser( req.app.get("db"), newUser.email)
            .then( dbUser => {

                if(dbUser){
                    return res.status(400).json({ error: `You seem to have account already`});
                };

                RegisterService.hashPassword( newUser.password)
                    .then( hashedPassword => {

                        //We hash the password and assign the hashed passoword to the current user 
                        newUser.password = hashedPassword;

                        RegisterService.insertUser( req.app.get("db"), newUser)
                            .then( user => {
                                
                                const sub = newUser.email;
                                const payload = {
                                    user: newUser.email
                                }

                                return res.status(200).json({ 
                                    token : RegisterService.createJwt( sub, payload)});

                            });
                    });
                
            });
    });

module.exports = RegisterRouter;
    
