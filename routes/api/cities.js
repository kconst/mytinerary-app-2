const express = require('express');
const router = express.Router();
const City = require("../../models/City")
const auth = require("../../middleware/auth")

// GET /api/cities/all
router.get("/all", (req, res) => {
  City.find({}, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);
  })
})

// POST /api/cities/all
router.post("/all", auth, (req, res) => {
  const newCity = new City({
    name: req.body.name,
    country: req.body.country
  });
  newCity.save().then(city => res.send(city))
})

// UPDATE /api/cities/:id
router.put("/:id", auth, (req, res) => {
  const updatedCity = {
    name: req.body.name,
    country: req.body.country
  }
  City.findOneAndUpdate({ name: req.params.id }, updatedCity)
  .then(city => res.json({ success: true }))
  .catch(err => res.status(404).json({ success: false }))
  }) 

// DELETE /api/cities/:id
router.delete("/:id", auth, (req, res) => {
  City.deleteOne({ name: req.params.id })
    .then(city => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router