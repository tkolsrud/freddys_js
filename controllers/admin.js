const express = require("express");
const router = express.Router();
const db = require("../models");




/* === Admin Home Route === */
router.get("/adminhome", async (req, res) => {
    try {
        const query = req.query;
        console.log(query);
        if (req.query.year) {
            req.query.year = { $regex: req.query.year, $options: "i" }
        }

        const allGuitars = await db.Guitar.find(query);
        const context = { guitars: allGuitars };

        return res.render("admin/adminhome", context);
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
});


/* === Add New Route === */

router.get("/addnew", (req, res) => {
    return res.render("admin/addnew");
})

router.post("/addnew", (req, res) => {
    db.Guitar.create(req.body, (err, createdGuitar) => {
        if (err) {
            console.log(err);
            return res.send("Server Error");
        } else {
            console.log("created Guitar", createdGuitar);
            return res.redirect("/adminhome");
        }
    })
});

module.exports = router;

/* === Admin Show Route === */
router.get("/admin/:id/edit", (req, res) => {
    db.Guitar.findById(req.params.id, (err, foundGuitar) => {
        if (err) return res.send(err);

        const context = { guitar: foundGuitar };

        console.log(foundGuitar);
        return res.render("admin/edit", context);
    });
});

/* === Update Guitar Route === */
router.put("/admin/:id", (req, res) => {
    db.Guitar.findByIdAndUpdate(
        {
            $set: {
                ...res.body,
            },
        },
        { new: true },
        (err, updatedGuitar) => {
            if (err) return res.send(err);
            return res.redirect(`/admin/${updatedGuitar._id}`);
        }
    );
});

/* === Delete Car Route === */
router.delete("admin/:id", (req, res) => {
    db.Guitar.findByIdAndDelete(req.params.id, (err, deletedGuitar) => {
        if (err) return res.send(err);

        return res.redirect("/adminhome");
    });
});


module.exports = router;