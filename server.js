/*
const jsonstring = '{"name":"bharat","age":25,"city":"belgaum"}';
const jsonobject = JSON.parse(jsonstring);
console.log(typeof jsonobject);


const objectToconvert = {
   name:"bharat",
   age:25,
   city:"belgaum"
}
const jsonstringified = JSON.stringify(objectToconvert);
console.log(typeof jsonstringified); 
*/

const express = require('express');
const app = express();
const db = require('./db.js');
require('dotenv').config();
const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.send("welcome to our hotel....!");
})

// import the Person Routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

// instead of using this we can use the try catch block and async and await
//    const data = req.body; //assuming the request body contains the person data

//create a new Person document using the mongoose model
//    const newPerson = new person(data);

//save the new person to the database

// .save() no more uses callbacks  
//    newPerson.save((error,savedperson)=>{
//       if(error){
//          console.log("error in saving person to the database",error);
//          res.status(500).json({error:"internal server error"});
//       }else{
//          console.log("person data saved successfully");
//          res.status(200).json(savedperson);
//       }
//    })

app.listen(PORT, () => {
   console.log(`server is running on port 3000`);
}) 