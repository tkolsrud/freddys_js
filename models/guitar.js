const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuitarSchema = new Schema(
    {
        model: { type: String, required: true },
        manufacturer: { type: String, required: true },
        img: { type: String, required: true },
        year: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const Guitar = mongoose.model('Guitar', GuitarSchema);

module.exports = Guitar;