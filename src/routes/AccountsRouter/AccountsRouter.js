const express = require("express");
const AccountsRouter = express.Router();
const {requireAuth} = require("../../middleware/jwtAuth");
const AccountService = require("./AccountsService");

AccountsRouter
    .route("/accounts")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .all(requireAuth)
    .get((req, res)=>{
        AccountService.getUserAccounts( req.app.get("db"), req.user.id)
            .then( accounts =>{
                if(!accounts){
                    return res.status(400).json({ error: "No accounts found"})
                };
               
                return res.status(200).json({ accounts });
            })
    })
    .post((req, res)=>{
        const {
            url,
            email_used,
            user_name,
            password
        } = req.body;

        const newAccount = {
            url,
            email_used,
            user_name,
            password,
            user_id: req.user.id
        };

        for( const[key, value] of Object.entries(newAccount)){
            if(value == undefined){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };
        }

        AccountService.createAccount( req.app.get("db"), newAccount)
            .then( account => {
                
                return res.status(200).json({ account })
            })
    })

module.exports = AccountsRouter;