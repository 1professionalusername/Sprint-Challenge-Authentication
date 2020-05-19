const express = require("express");
const Users = require("./users-model");
const restrict = require("../auth/authenticate-middleware");

const router = express.Router();

router.get("/", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find());
    } catch (err) {
        next(err);
    }
});

router.get("/:id", restrict(), async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id)

        if (!user) {
            res.status(404).json({
                message: "User Not Found."
            })
        }
        res.json(user)
    } catch (err) {
        next(err)
    }
})

module.exports = router;