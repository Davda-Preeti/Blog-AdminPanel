const { Schema, model } = require("mongoose");

const common = {
    trim : true,
    type : String,
    required : true
}


const  blogSchema = new Schema({
    blog_name:{
        ...common,
        unique : true
    },
    blog_category : common,
    blog_author : common,
    blog_Tags : common,
    blog_date :common,
    blog_description : common,
    blog_image : String
})

const Blog = model("Blog",blogSchema)

module.exports = Blog