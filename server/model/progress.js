const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const progressSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true,
        default: Date.now
    },
    student:{
        type:ObjectId,
        ref:"Student"
    },
    supervisor:{
        type:ObjectId,
        ref:"User"
    },
    pressentedAdvance:{
        type:Boolean,
        required:true
    }
})

mongoose.model("Progress", progressSchema)