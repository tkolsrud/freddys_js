const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const GuitarSchema = new Schema(
    {
        model: { type: String, required: true },
        manufacturer: { type: String, required: true },
        img: { type: String, require: true }
    },
    {
        timestamps: true,
    }
);

const Guitar = mongoose.model('Guitar', GuitarSchema);

module.exports = Guitar;