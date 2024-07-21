const mongoose = require('mongoose');
require('dotenv').config();
// const mongoURL = process.env.MONGO_DB_LOCAL;
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL,{
   useNewUrlParser:true,
   useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('connected',()=>{
   console.log("connected to db");
})

db.on('error',()=>{
   console.log("error in connecting to db");
})

db.on('disconnected',()=>{
   console.log("disconnected from db");
})

// export the database connection
module.exports = db;