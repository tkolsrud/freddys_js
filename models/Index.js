// require mongoose
const mongoose = require("mongoose");

// connect to mongodb
require("dotenv").config();

const dbUrl = "mongodb://localhost:27017/freddysgutiars_db";


// connect mongoose
mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(function () {
        console.log("MongoDB connected!");
    })
    .catch(function (err) {
        console.log(("MongoDB error"));
        console.log(err);
    });

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB disconnected");
});

module.exports = {

}