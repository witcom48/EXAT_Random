
const express = require("express")
const router = express.Router()

const user = require("../controllers/user.controller")

router.post("/verify", user.verify)

module.exports = router