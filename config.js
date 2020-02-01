require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://jason:carcamo11@localhost/password-manager-test",
    JWT_SECRET: process.env.JWT_SECRET  || "knwenfkwevjhwv",
    NODE_ENV: process.env.NODE_ENV || 'development',   
};