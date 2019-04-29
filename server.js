const express = require('express');
const mongoose = require('mongoose');
const cities = require("./routes/api/cities")
const itineraries = require("./routes/api/itineraries")
const activities = require("./routes/api/activities")
const comments = require("./routes/api/comments")
const users = require("./routes/api/users")
const auth = require("./routes/api/auth")
const app = express();
const path = require("path")
const port = process.env.PORT || 5000;
require('dotenv').config()



app.use("/uploads", express.static("uploads"))
app.use("/cities/uploads", express.static("uploads"))
app.use("/itineraries/uploads", express.static("uploads"))

app.use(express.json())

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(process.env.MONGO_URL, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to db");
});


// Routes
app.use('/api/cities', cities);
app.use('/api/itineraries', itineraries);
app.use('/api/activities', activities);
app.use('/api/comments', comments)
app.use('/api/users', users)
app.use('/api/auth', auth)

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })

}

app.listen(port);
console.log('Magic happens on port ' + port);