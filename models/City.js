var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
    name: String,
    country: String
});

module.exports = City = mongoose.model("City", citySchema);