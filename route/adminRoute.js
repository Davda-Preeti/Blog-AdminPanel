// const passport = require("../config/passport")
const admin = require("../controller/adminController")
const upload = require("../middleware/fileUpload")
const passport = require('passport')

const route=require("express").Router()

route.post("/register",admin.register)
route.post("/login", passport.authenticate('local', { failureRedirect: '/login',successRedirect:'/' }))
route.post("/updateProfile",upload.single("admin_profile"),admin.updateProfile)
route.post("/changePassword",admin.changePassword)

module.exports=route