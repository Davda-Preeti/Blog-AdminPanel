const Admin = require("../model/adminModel");
const { plainToHash, hashToPlain } = require("../utils/password");

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body
        console.log(req.body);
        const existemail = await Admin.findOne({ email }).countDocuments().exec()
        console.log('existemail: ', existemail);
        if (existemail > 0) {
            res.json("email id already exists")
        } else {
            const hashpass = await plainToHash(password)
            await Admin.create({ username, password: hashpass, email })
            res.redirect("/login")
        }
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
    try {
        console.log('req.body: ', req.body);
        const { email, password } = req.body
        const existemail = await Admin.findOne({ email }).countDocuments().exec()
        if (existemail > 0) {
            const admin = await Admin.findOne({ email })
            const match_pass = await hashToPlain(password, admin.password)
            if (match_pass) {
                const payload = {
                    username: admin.username,
                    email: admin.email
                }
                res.cookie("admin", payload, { httpOnly: true })
                res.redirect("/")
            } else {
                res.json("Your Password is incorrect")
            }
        } else {
            res.json("email does not exists")
        }
    } catch (error) {
        console.log(error)

    }
}

exports.updateProfile = async (req, res) => {
    try {
        console.log('req.file: ', req.file);
        console.log('req.body: ', req.body);
        const { email, username } = req.body
        const existEmail = await Admin.findOne({ email }).countDocuments().exec()
        if (existEmail > 0) {
            await Admin.updateOne(
                { email: email },
                {
                    username,
                    admin_profile: req?.file?.filename
                }
            )
            res.redirect("/myProfile")
        } else {
            res.json("Your Email does not exist")
        }
    } catch (error) {
        console.log(error)

    }
}