const express = require("express");
const router = express.Router();
const { getCommission, addCommission, updateCommission } = require("../controllers/commissionController");

router.get("/getCommission/:commission_id", getCommission);
router.post("/addCommission", addCommission);
router.put("/updateCommission/:commission_id", updateCommission);

module.exports = router;