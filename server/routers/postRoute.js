const postController = require("../controllers/postController");

//Creating routes for posts
const router = require("express").Router();

router.get("/", postController.getAllPosts);
router.get("/:id",postController.getPostById); 
router.post("/", postController.addPost);
router.put("/:id", postController.updatePostById);
router.delete("/:id",postController.deletePost)


module.exports = router;
