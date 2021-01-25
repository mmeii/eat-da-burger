// import dependencies
const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

//Create the router for the app
router.get("/", (req, res) => {
    burger.all((data) => {
        res.render("index", { burgers: data });
    });
});

router.post("/api/burgers", (req, res) => {
    burger.create(
        ["name", "devoured"],
        [req.body.name, req.body.devoured],
        (result) => {
            res.json({ id: result.id });
        }
    );
});

router.put("/api/burgers/:id", (req, res) => {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update(
        { devoured: req.body.devoured },
        condition,
        (result) => {
            if (result.changedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});

router.delete("/api/burgers/:id", (req, res) => {
    const condition = "id = " + req.params.id;

    burger.delete(condition, (result) => {
        if (result.affectedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//export the route
module.exports = router;