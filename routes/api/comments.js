const express = require('express');
const router = express.Router();
const Comment = require("../../models/Comment")
const auth = require("../../middleware/auth")


// GET /api/comments/:itineraryId - gets comments sorted in reverse chronological order (using timestamp)
router.get("/:itineraryId", (req, res) => {
  Comment.find({ itineraryId: req.params.itineraryId }, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);
  }).sort({ timestamp: -1 })
})


// POST /api/comments/:itineraryId
router.post("/:itineraryId", auth, (req, res) => {
  const newComment = new Comment({
    itineraryId: req.body.itineraryId,
    user: req.body.user,
    message: req.body.message,
    timestamp: req.body.timestamp
  });
  newComment.save().then(comment => res.send(comment))
})

// UPDATE /api/comments/:commentId - not tested yet, check if necessary
/* router.put("/:commentId", (req, res) => {
  const updatedComment ={ 
    itineraryId: req.body.itineraryId,
    user: req.body.user,
    message: req.body.message,
    timestamp: req.body.timestamp
  };
  Comment.findOneAndUpdate({ _id: req.params.commentId }, updatedComment)
    .then(() => res.json({ success: true }))
    .catch(() => res.status(404).json({ success: false }))
}) */

// DELETE /api/comments/:commentId
router.delete("/:commentId", auth, (req, res) => {
  Comment.deleteOne({ _id: req.params.commentId })
    .then(() => res.json({ success: true }))
    .catch(() => res.status(404).json({ success: false }))
})

module.exports = router


