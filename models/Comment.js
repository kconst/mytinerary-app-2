var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    itineraryId: String,
    user: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = Comment = mongoose.model("Comment", commentSchema);