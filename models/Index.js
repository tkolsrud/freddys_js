// require mongoose
const mongoose = require("mongoose");

// connect to mongodb
require("dotenv").config();

const dbUrl = process.env.MONGO_URI;


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
    Guitar: require("./Guitar"),
    User: require("./User")
};