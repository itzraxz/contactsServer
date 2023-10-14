const express = require("express");
const router = express.Router();

router.route("/").all((req, res) => {
    res.send({
        message: "Hi! thx for visiting our REST Api"
    })
});

module.exports = router;
