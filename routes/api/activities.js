const express = require('express');
const router = express.Router();
const Activity = require("../../models/Activity")
const auth = require("../../middleware/auth")

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true)
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

// GET /api/activities/:itineraryId
router.get("/:itineraryId", (req, res) => {
  Activity.find({ itineraryId: req.params.itineraryId }, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);
  })
})

// POST /api/activities/:itineraryId - uses multer to upload image
router.post("/:itineraryId", upload.single("activityImage"), (req, res) => {
  const newActivity = new Activity({
    itineraryId: req.body.itineraryId,
    img: req.file.path,
    caption: req.body.caption
  });
  newActivity.save().then(activity => res.send(activity))
})

// UPDATE /api/activities/:activityId
router.put("/:activityId", upload.single("activityImage"), auth, (req, res) => {
  const updatedActivity = {
    itineraryId: req.body.itineraryId,
    img: req.file.path,
    caption: req.body.caption
  }
  Activity.findOneAndUpdate({ _id: req.params.activityId }, updatedActivity)
    .then(() => res.json({ success: true }))
    .catch(() => res.status(404).json({ success: false }))
})

// DELETE /api/activities/:activityId
router.delete("/:activityId", auth, (req, res) => {
  Activity.deleteOne({ _id: req.params.activityId })
    .then(() => res.json({ success: true }))
    .catch(() => res.status(404).json({ success: false }))
})

module.exports = router


