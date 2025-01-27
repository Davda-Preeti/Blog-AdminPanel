exports.accessPage=(req,res,url)=>{
    if(!req.cookies.admin){
        res.redirect("/Login")
    }else{
        res.render(url)
    }
}