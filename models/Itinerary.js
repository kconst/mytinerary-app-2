var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itinerarySchema = new Schema({
    title: {
        type: String
    },
    user: {
        type: String
    },
    likes: {
        type: Number
    },
    rating: {
        type: Number
    },
    duration: {
        type: Number
    },
    price: {
        type: String
    },
    hashtag: {
        type: Array
    },
    cityName: {
        type: String
    }
});

module.exports = Itinerary = mongoose.model("Itinerary", itinerarySchema);