const express = require('express');
const router = express.Router();
const menuitem = require('../models/Menu.js');

// POST method for menu
router.post('/', async (req, res) => {
   try {
      const data = req.body;
      const newMenu = new menuitem(data);
      const response = await newMenu.save();
      console.log("data saved");
      res.status(200).json(response);
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ error: "internal server error" });
   }
})

// GET method to get menu data
router.get('/', async (req, res) => {
   try {
      const data = await menuitem.find();
      console.log("data fetched");
      res.status(200).json(data);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
})

// GET method using parameterized API call
router.get('/:tastetype', async (req, res) => {
   try {
      const tastetype = req.params.tastetype; 
      if(tastetype == "sweet" || tastetype == "spicy" || tastetype == "sour"){
         const response = await menuitem.find({ taste: tastetype });
         console.log("data fetched");
         res.status(200).json(response);
      }else{
         res.status(404).json({ error: "invalid taste" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'internal server error' });
   }
})
module.exports = router;