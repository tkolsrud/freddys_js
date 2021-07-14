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
    const id = req.params.id;
    db.Guitar.findById(id, (err, foundGuitar) => {
        if (err) {
            console.log(err);
            return res.send("Server Error");
        } else {
            const context = { guitar: foundGuitar };
            console.log(foundGuitar);
            return res.render("shop/show", context);
        }
    })
});

/*  === Add to Cart Route === */
router.put("/shop/:id", (req, res) => {
    const guitarId = req.params.id;
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.send(err);

        foundUser.garage.push(guitarId);
        foundUser.save();
        return res.redirect("/cart");
    });
});

/* === Cart Show Route === */
router.get("/cart/:id", (req, res) => {
    const id = req.params.id;
    db.Guitar.findById(id, (err, foundGuitar) => {
        if (err) {
            console.log(err);
            return res.send("Server Error");
        } else {
            const context = { car: foundGuitar };
            console.log(foundGuitar);
            return res.render("shop/cartshow", context);
        }
    })
});

/* === Remove From Cart Route === */
router.put("/cart/:id", (req, res) => {
    const guitarId = req.params.id;
    db.User.findById(req.session.currentUser.id, async (err, foundUser) => {
        try {
            const index = foundUser.cart.indexOf(guitarId);
            foundUser.cart.splice(index, 1);
            await foundUser.save();

            return res.redirect("/garage");
        } catch (err) {
            console.log(err);
            return res.send("Server Error");
        }
    });
});

/* === User Settings Route === */
router.get("/settings", (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) {
            console.log(err);
            return res.send("Server Error");
        } else {
            const context = { user: foundUser };
            return res.render("site/setings", context);
        }
    });
});

module.exports = router;