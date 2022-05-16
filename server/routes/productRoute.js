const express = require("express");
const router = express.Router();
const { getProductById, addProduct, updateProduct, deleteProduct, getAllProducts, getProductByUserId } = require("../controllers/productController");

router.get("/getProductById/:product_id", getProductById);
router.get("/getProductByUserId/:user_id", getProductByUserId);
router.post("/addProduct", addProduct);
router.put("/updateProduct/:product_id", updateProduct);
router.delete("/deleteProduct/:product_id", deleteProduct);
router.get("/getAllProducts", getAllProducts);

module.exports = router;