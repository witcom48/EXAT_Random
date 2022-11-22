const express = require("express")
const router = express.Router()
const empoyee = require("../controllers/empoyee.controller")

router.get("/v1/employee_prize/:status", empoyee.findAllPrize)
router.get("/v1/summary_prize", empoyee.summaryPrize)

module.exports = router

