const usersController = require("../controllers/userController");

const router = require("express").Router();

router.get("/",usersController.getAllUsers);
router.post("/signup", usersController.signUp);
router.post("/login", usersController.login);


module.exports= router;

