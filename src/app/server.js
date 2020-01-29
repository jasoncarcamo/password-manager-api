require("dotenv").config();
const app = require("./app");
const knex = require("knex");

const db = knex({
    client: "pg",
    connection: process.env.DATABASE_URL
});


//Pass the db through the middleware pipleine
app.set("db", db);

app.listen(process.env.PORT, ()=>{
    console.log("Server listening on port 8000")
});
