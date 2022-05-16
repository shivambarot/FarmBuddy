const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorizeCustomer, authorizeFarmer} = require('../middlewares/auth')
const { validateBody } = require('../middlewares/validator')
const useSchemas =  require('../schemas/user')

router.get("/getUserById/:user_id", userController.getUserById);
router.post("/login", validateBody(useSchemas.loginSchema), userController.login)
router.post("/register", validateBody(useSchemas.registerSchema), userController.addUser);


module.exports = router;