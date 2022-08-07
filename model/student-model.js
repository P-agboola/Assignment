const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [ true, " full name is required"],
        minLength: [4, "sorry this field must contain more than 4 characters"],
        trim: true,
    },
    twitterUrl: String,
    linkedinUrl: String,
    phoneNumber: String,
    dateOfBirth: Date,
    goalDescription:{
        type: String,
        minLength:[20,"characters must be more than 20"],
        maxLength :[200, "word shold not be more than 200"],
        trim :true,
    }, 
});


const student = mongoose.model("student",studentSchema);
module.exports = student;