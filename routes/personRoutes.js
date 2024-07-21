const express = require('express');
const router = express.Router();
const person = require('../models/person.js');

// POST route to add a person
router.post('/', async (req, res) => {
   try {
      const data = req.body; //assuming the request body contains the person data

      //create a new Person document using the mongoose model
      const newPerson = new person(data);

      //save the new person to the database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
})

// GET method to get person's data
router.get('/', async (req, res) => {
   try {
      const data = await person.find();
      console.log("data fetched");
      res.status(200).json(data);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
})

// GET method using parameterized API call
router.get('/:workType', async (req, res) => {
   try {
      const worktype = req.params.workType;
      if (worktype == "manager" || worktype == "chef" || worktype == "waiter") {
         const response = await person.find({ work: worktype });
         console.log("response fetched");
         res.status(200).json(response);
      } else {
         res.status(404).json({ error: "invalid work type" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
})

// PUT method to update person's data
router.put('/:id', async (req, res) => {
   try {
      const personid = req.params.id; //extract the person id from the URL
      const updatedpersondata = req.body; //extract the updated data from the request body
      const response = await person.findByIdAndUpdate(personid, updatedpersondata, {
         new: true,//to return the updated document
         runValidators: true,//run mongoose validators
      });
      if(!response){
         res.status(404).json({error:"person not found"});
      }
      console.log("data updated");
      res.status(200).json(response);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
})

// DELETE method to delete person's data
router.delete('/:id',async(req,res)=>{
   try {
      const personid = req.params.id; //extract the person id from the URL
      const response = await person.findByIdAndDelete(personid);
      if(!response){
         res.status(404).json({error:"person not found"});
      }
      console.log("data deleted");
      res.status(200).json({message:"person deleted successfully"});
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
})
module.exports = router;