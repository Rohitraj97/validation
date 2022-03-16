const mongoose = require("mongoose")
module.exports = () => {
    return mongoose.connect(
        "mongodb+srv://validation:validation123@cluster0.akddj.mongodb.net/validation?retryWrites=true&w=majority"
        )
}