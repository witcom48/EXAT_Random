
const express = require("express")
const router = express.Router()
const checkin = require("../controllers/checkin.controller")
const authenBasic = require('../middlewares/authentication.middleware')
const validateCheckin = require('../middlewares/validate_checkin')

router.get("/v1/checkin_list", checkin.findAllCheckin)
router.get("/v1/checkin/:empid", checkin.findOne)
router.post("/v1/checkin", authenBasic, validateCheckin, checkin.create)
router.post("/v1/remove_checkin", authenBasic, checkin.delete)

module.exports = router
