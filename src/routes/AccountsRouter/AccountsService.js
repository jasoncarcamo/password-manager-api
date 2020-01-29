const AccountsService = {
    getUserAccounts( db, user_id){
        return db.select("*").from("accounts").where({user_id});
    },
    getUserAccount( db, id){
        return db.select("*").from("accounts").where({ id });
    },
    createAccount(db, account){
        return db.insert(account).into("accounts").returning("*").then(([newAccount]) => newAccount);
    },
    updateAccount( db, id, account){
        return db.update(account).from("accounts").where({id});
    },
    deleteAccount(db, id){
        return db.delete().from("accounts").where({id});
    }
};

module.exports = AccountsService;