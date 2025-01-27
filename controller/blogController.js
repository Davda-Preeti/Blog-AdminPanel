const Blog = require("../model/blogModel")

exports.Store = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const { blog_name, blog_category, blog_author, blog_Tags, blog_date, blog_description } = req.body;

        const existName = await Blog.findOne({ blog_name }).countDocuments()
        console.log('existName:', existName);

        if (existName > 0) {
            res.json("Blog already exits")
        } else {
            await Blog.create({
                blog_name, blog_category, blog_author, blog_Tags, blog_date, blog_description, blog_image: req?.file?.filename
            })
            res.redirect("/ViewBlog")
        }
    } catch (error) {
        console.log(error)
    }
}
exports.trash = async(req,res)=>{
    try{
        const{id}= req.params
        await Blog.findByIdAndDelete(id)
        res.redirect("/ViewBlog")
    } catch(error){
        console.log(error);
    }
}
exports.update = async(req,res)=>{
    try {
        const {id} = req.params;
        const {blog_name,blog_category,blog_author,blog_Tags, blog_date, blog_description }= req.body;
        await Blog.findByIdAndUpdate(
            {
                _id : id
            },{
                blog_name,blog_category,blog_author,blog_Tags, blog_date, blog_description,blog_image:req?.file?.filename 
            }
        )
        res.redirect('/ViewBlog')
        } catch (error) {
            res.json(error)
        
    }
}