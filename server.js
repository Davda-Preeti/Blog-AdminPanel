const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 5000;
const cookieParser=require("cookie-parser")
app.set('view engine', 'ejs');

app.use(express.static('public'))
const blogRoute = require("./route/blogRoute");
const Blog = require('./model/blogModel');
const adminRoute = require("./route/adminRoute")
const pageRoute=require("./route/pageRoute")
app.use('/profile', express.static('upload'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


require("./config/db").dbconnect()
app.use(cookieParser())


app.use("/",pageRoute)
app.use('/api/blog', blogRoute);
app.use("/api/admin",adminRoute)


app.listen(PORT, () => {
    console.log(`Example app listening on PORT http://localhost:${PORT}`);
})






