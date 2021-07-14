const express = require("express");
const router = express.Router();
const db = require("../models")

/* === About Route === */
router.get("/about", (req, res) => {
    res.render("shop/about");
});

/* === Help Route === */
router.get("/help", (req, res) => {
    res.render("shop/help");
});

/* === Index Route === */
router.get("/index", async (req, res) => {
    try {
        const query = req.query;
        console.log(query);
        if (req.query.year) {
            req.query.year = { $regex: req.query.year, $options: "i" }
        }

        const allGuitars = await db.Guitar.find(query);
        const context = { guitars: allGuitars }

        return res.render('shop/index', context);
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
});

/* === Cart Route === */
router.get("/cart", (req, res) => {
    res.render("shop/cart");
});

/* === Show Route === */
router.get("/shop/:id", (req, res) => {
    res.render("shop/show");
});

/*  === Add to Cart Route === */
router.put("/shop/:id", (req, res) => {
    res.redirect("/cart");
});

/* === Cart Show Route === */


module.exports = router;