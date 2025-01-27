const admin=require("../controller/adminController")

const upload=require("../middleware/fileUpload")

const route=require("express").Router()

route.post("/Register",admin.register)
route.post("/Login",admin.login)
route.post("/updateProfile",upload.single("admin_profile"),admin.updateProfile)

module.exports=route