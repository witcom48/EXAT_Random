

const express = require("express")
const router = express.Router()
const prize = require("../controllers/prize.controller")
const authenBasic = require('../middlewares/authentication.middleware')
const validatePrize = require('../middlewares/validate_prize.middleware')

router.get("/v1/prize", prize.findAll)
router.get("/v1/prize_result", prize.findPrizeWithEmp)
router.get("/v1/prize/:pcode", prize.findOne)
router.get("/v1/prize_type/:ptype", prize.findWithType)
router.get("/v1/prize_emp/:empid", prize.findWithEmp)
router.post("/v1/update_flag", authenBasic, validatePrize, prize.updateFlag)

module.exports = router
