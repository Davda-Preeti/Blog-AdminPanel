const Admin = require("../model/adminModel")
const { hashToPlain } = require("../utils/password")

const LocalStrategy = require("passport-local").Strategy

module.exports = (passport) => {
  passport.use(new LocalStrategy ({usernameField:"email"} ,async (email, password, done) => {
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return done(null, false, console.log("Admin not found"))
    }
    const match = await hashToPlain(password, admin.password)
    if (!match) {
      return done(null, false, console.log("password doesn't match"))
    }
    return done(null, admin)
  }))
 
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done)=> {
    const user=await Admin.findById(id)
    if(user){
      done(null,user)
    }
  });
}