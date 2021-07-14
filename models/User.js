const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        cart: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Guitar" }
        ],
        admin: { type: Boolean, default: false }
    },
    {
        timestamp: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;