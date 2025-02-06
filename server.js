const express= require('express')
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 5000
app.set("view engine",'ejs')

const cookieParser=require("cookie-parser")
app.use(express.static('public'))

const pageRoutes=require("./route/pageRoute")
const blogRoute=require("./route/blogRoute")
const adminRoute=require("./route/adminRoute")

const flash = require("express-flash")
const session = require("express-session")
const passport = require("passport")
const passportAuth = require("./config/passport")
passportAuth(passport)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/profile',express.static('upload'))

require("./config/db").dbconnect()
app.use(cookieParser("test11"))
app.use(session("test"))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.use("/",pageRoutes)

app.use("/api/blog",blogRoute)
app.use("/api/admin",adminRoute)

app.listen(PORT, ()=>{
    console.log(`server listning at http://localhost:${PORT}`);
})