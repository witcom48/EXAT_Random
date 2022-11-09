

const express = require("express")
const router = express.Router()
const checkin = require("../controllers/checkin.controller")
const authenBasic = require('../middlewares/authentication.middleware')


router.get("/v1/checkin/:empid", checkin.findOne)
router.post("/v1/checkin", authenBasic, checkin.create)
router.post("/v1/remove_checkin", authenBasic, checkin.delete)

module.exports = router
