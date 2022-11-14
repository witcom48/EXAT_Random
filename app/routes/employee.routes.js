const express = require("express")
const router = express.Router()
const empoyee = require("../controllers/empoyee.controller")

router.get("/v1/summary_emp", empoyee.getSummaryEmp)

module.exports = router

