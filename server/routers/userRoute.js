const usersController = require("../controllers/userController");

const router = require("express").Router();

router.get("/",usersController.getAllUsers);
router.get("/:id", usersController.getUserById)
router.post("/signup", usersController.signUp);
router.post("/login", usersController.login);
router.post("/verify", usersController.verifyUser);


module.exports= router;

