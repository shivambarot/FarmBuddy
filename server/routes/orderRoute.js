const express = require("express");
const router = express.Router();
const { getOrderById, addOrder, deleteOrder, getOrderByUserId } = require("../controllers/orderController");

router.get("/getOrderById/:order_id", getOrderById);
router.get("/getOrderByUserId/:user_id", getOrderByUserId);
router.post("/addOrder", addOrder);
router.delete("/deleteOrder/:order_id", deleteOrder);

module.exports = router;