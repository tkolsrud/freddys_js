const { Mongoose } = require("mongoose");
const db = require("../models");

const guitars = [
    {
        model: "Stratocaster",
        manufacturer: "Fender",
        img: "https://s3.amazonaws.com/fretboard/wp-content/uploads/2014/03/27125511/ef8510_front_cl.jpg",
        year: "1957"
    },
    {
        model: "Les Paul",
        manufacturer: "Gibson",
        img: "https://static.keymusic.com/products/138369/XL/gibson-custom-shop-1960-les-paul-standard-reissue-faded-tobacco-2.jpg",
        year: "1959"
    },
    {
        model: "RG",
        manufacturer: "Ibanez",
        img: "https://peachguitars.2dimg.com/114/1504710966_4303.jpg",
        year: "1992"
    }
];

const run = async () => {
    try {
        await db.Guitar.deleteMany({});
        const createdGuitars = await db.Guitar.insterMany(guitars);
        console.log("Seed Finished");
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

run();