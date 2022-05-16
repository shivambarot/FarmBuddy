const express = require("express");
const router = express.Router();
const { getTaxByProvince, addTaxByProvince, updateTaxByProvince } = require("../controllers/taxController");

router.get("/getTaxByProvince/:province", getTaxByProvince);
router.post("/addTaxByProvince", addTaxByProvince);
router.put("/updateTaxByProvince/:province", updateTaxByProvince);

module.exports = router;