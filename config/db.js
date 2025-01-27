const { default: mongoose } = require("mongoose");

exports.dbconnect = () => {
    mongoose.connect('mongodb+srv://davdapreeti9:w6sx0o5dYQhgfmKR@cluster0.rntic.mongodb.net/blog')
        .then(() => console.log("😍db connect😍"))
        .catch(err => console.log(err));
}