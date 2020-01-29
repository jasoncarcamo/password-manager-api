const express = require("express");
const LoginRouter = express.Router();
const LoginService = require("./LoginService");

LoginRouter
    .route("/login")
    .all(express.json())
    .all( express.urlencoded({ extended: true}))
    .post(( req, res)=>{

        const {
            email,
            password
        } = req.body;

        const user = {
            email,
            password
        };

        for( const [key, value] of Object.entries(user)){
            if(value == undefined){
                return res.status(400).json({ error: `Missing ${key} from body request`});
            };
        };

        LoginService.getUser( req.app.get("db"), user.email)
            .then( dbUser =>{
                if(!dbUser){
                    return res.status(400).json({ error: `No user found`});
                };

                LoginService.comparePassword( user.password, dbUser.password)
                    .then( passwordMatches =>{

                        if(!passwordMatches){
                            return res.status(400).json({ error: "Incorrect password"});
                        };

                        const sub = dbUser.email;
                        const payload = {
                            user: dbUser.email
                        }

                        return res.status(200).json({ token: LoginService.createJwt(sub, payload)});

                    });
            });
    });

module.exports = LoginRouter;