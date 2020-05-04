const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    studentCode:{
        type:Number,
        required:true
    },
    supervisor:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Student", studentSchema)