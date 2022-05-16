const express = require("express");
const router = express.Router();
const { getUserCart, getCart, addUserCart, updateCart, deleteCart, deleteCartByProduct} = require("../controllers/cartController");

router.get("/getUserCart/:user_id", getUserCart);
router.get("/getCart/:cart_id", getCart);
router.post("/addUserCart", addUserCart);
router.put("/updateCart/:cart_id", updateCart);
router.delete("/deleteCart/:cart_id", deleteCart);
router.delete("/:product_id", deleteCartByProduct);


module.exports = router;