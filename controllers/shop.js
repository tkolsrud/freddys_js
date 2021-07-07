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
router.get("/index", (req, res) => {
    res.render("shop/index");
})

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