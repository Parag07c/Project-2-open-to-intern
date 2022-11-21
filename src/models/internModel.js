const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        require: true,
        unique: true,
        trim: true
    },
    collegeId: {
        type: ObjectId,
        ref: "College"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })



module.exports = mongoose.model("intern", internSchema)