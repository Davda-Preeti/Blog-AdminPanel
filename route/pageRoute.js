const route = require("express").Router()
const Admin = require("../model/adminModel")
const Blog = require('../model/blogModel')
const { accessPage } = require("../utils/accessPage")

route.get('/', accessPage, (req, res) => {
    res.render('pages/index')
})

route.get('/addBlog', accessPage, (req, res) => {
    res.render('pages/addBlog')

    // accessPage(req,res,"pages/addBlog")
})

route.get("/viewBlog", accessPage, async (req, res) => {
    const Blogs = await Blog.find()
    res.render("pages/viewBlog", {
        Blogs
    })
})

route.get("/updateBlog", accessPage, async (req, res) => {
    const { id } = req.query
    const blogs = await Blog.findById(id)
    res.render("pages/updateBlog", {
        blogs
    })
})

route.get('/register', accessPage, (req, res) => {
    res.render("pages/register", { message: req.flash("info") })
})
route.get('/login', (req, res) => {
    res.render("pages/login")
})
route.get("/logout", accessPage, (req, res) => {
    req.logOut((err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/login')
        }
    })
})
route.get("/myProfile", accessPage, async (req, res) => {
    const email = req.user.email
    const singleAdmin = await Admin.findOne({ email })
    // console.log('singleAdmin: ', singleAdmin);
    res.render("pages/myProfile", {
        admin: singleAdmin
    })
})

route.get('/changePassword',accessPage, async(req,res)=>{
    const email = req.user.email
    console.log(email)
    res.render('pages/changePassword', {email})
})

module.exports = route