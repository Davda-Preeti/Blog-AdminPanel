const {Schema, model}= require("mongoose");

const common ={
    trim : true,
    required : true,
    type : String,
    unique : true
}

const adminSchema = new Schema({
    username : common,
    password:{
        ...common,
        unique : false
    },
    email: common,
    admin_profile:String
})

const Admin = model ('Admin',adminSchema)
module.exports = Admin