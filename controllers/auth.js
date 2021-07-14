const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");
const e = require("express");
const { response } = require("express");

/* === Register Route === */
router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.post("/register", async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (foundUser) {
            return res.redirect("/login");
        }

        if (req.body.retypepassword !== req.body.password) {
            return res.render("auth/retype");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const newUser = await db.User.create(req.body);
        return res.redirect("/login");

    } catch (err) {
        console.log(err);
        return res.send(err);
    }
});

/* === Login Route === */
router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login", async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (!foundUser) return res.redirect("/register");
        const match = await bcrypt.compare(req.body.password, foundUser.password);

        if (!match) return res.redirect("/faillogin");

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
        }
        if (foundUser.admin) {
            return res.redirect("/adminhome");
        }

        return res.redirect("/index");
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

/* === About Route === */
router.get("/aboutauth", (req, res) => {
    res.render("auth/aboutauth");
});

/* === Help Route === */
router.get("/helpauth", (req, res) => {
    res.render("auth/helpauth");
});

/* === Logout Route === */
router.delete("/logout", async (req, res) => {
    await req.ressions.destroy();
    return res.redirect("/");
});

module.exports = router;