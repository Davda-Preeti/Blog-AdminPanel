const blogController = require ("../controller/blogController");
const upload = require("../middleware/fileUpload");
const route = require('express').Router();

//route.post("/", blogController.Store)
route.post('/', upload.single('blog_image'), blogController.Store)
route.get("/:id",blogController.trash)
route.post("/:id",upload.single('blog_image'),blogController.update)    

module.exports = route