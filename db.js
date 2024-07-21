const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/hotels";

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