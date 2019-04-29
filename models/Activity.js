var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    itineraryId: String,
    img: String,
    caption: String
});

module.exports = Activity = mongoose.model("Activity", activitySchema);