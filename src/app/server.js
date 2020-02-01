require("dotenv").config();
const {DATABASE_URL, PORT} = require("../../config");

const app = require("./app");
const knex = require("knex");

const db = knex({
    client: "pg",
    connection: DATABASE_URL
});


//Pass the db through the middleware pipleine
app.set("db", db);

app.listen( PORT, ()=>{
    console.log("Server listening on port 8000")
});
