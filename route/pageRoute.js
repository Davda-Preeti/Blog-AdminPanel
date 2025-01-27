const route= require("express").Router()
const Admin = require("../model/adminModel")
const Blog = require('../model/blogModel')
const { accessPage } = require("../utils/accessPage")

route.get('/',(req,res)=>{
    // res.render('../views/pages/index')
    accessPage(req,res,"pages/index")
})

route.get('/addBlog',(req,res)=>{
    // res.render('../views/pages/addBlog')
    accessPage(req,res,"pages/AddBlog")
})

route.get("/viewBlog",async(req,res)=>{
    const Blogs= await Blog.find()
    res.render("../views/pages/ViewBlog",{
        Blogs
    })
})

route.get("/updateBlog",async(req,res)=>{
    const {id}= req.query
    const blogs=await Blog.findById(id)
    res.render("../views/pages/UpdateBlog",{
     blogs
    })
})

route.get('/Register',(req,res)=>{
    res.render("pages/Register")
})
route.get('/login',(req,res)=>{
    res.render("pages/Login")
})
route.get("/logout",(req,res)=>{
    res.clearCookie('admin')
    res.redirect('/Login')
})
route.get("/myProfile",async(req,res)=>{
    const cookieadmin= req.cookies.admin
    // console.log('cookieadmin: ', cookieadmin);
    const email= cookieadmin.email
    const singleAdmin= await Admin.findOne({email})
    // console.log('singleAdmin: ', singleAdmin);
    res.render("pages/myProfile",{
        admin:singleAdmin
    })
})

module.exports=route