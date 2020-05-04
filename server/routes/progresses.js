const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Progress = mongoose.model("Progress")

router.get('/progresses', requireLogin,(request, response)=>{
    Progress.find()
    .populate("student","_id firstName lastName")
    .populate("supervisor","_id name")
    .then(progresses=>{
        response.json({progresses})
    })
    .catch(error=>{
        console.log(error)
    })
})

router.post('/add_progress',requireLogin,(request,response)=>{
    const{student,pressentedAdvance} = request.body
    if (!student || !pressentedAdvance) 
    {
        return response.status(422).json({error:"Agregue todos los campos"})    
    }

    const progress = new Progress({
        student,
        supervisor:request.user,
        pressentedAdvance
    })
    progress.save().then(result=>{
        response.json({progress:result})
    })
    .catch(error=>{
        console.log(error)
    })
})

module.exports = router