const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Student = mongoose.model("Student")

router.get('/students',(request,response)=>{
    Student.find()
    .populate("supervisor", "_id name")
    .then(students=>{
        response.json({students})
    })
    .catch(error=>{
        console.log(error)
    })
})

router.post('/create_student',requireLogin,(request, response)=>{
    const {     
       firstName,
       lastName,
       studentCode
    } = request.body
    
    if (!firstName ||
        !lastName ||
        !studentCode) 
    {
        return response.status(422).json({error:"Agregue todos los campos por favor"})
    }

    const student = new Student({
        firstName,
        lastName,
        studentCode,
        supervisor:request.user
    })
    student.save().then(result=>{
        response.json({student:result})
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get('/my_students',requireLogin,(request,response)=>{
  Student.find({supervisor:request.user._id})
  .populate("supervisor", "_id name")
  .then(my_students=>{
      response.json({my_students})
  })  
  .catch(error=>{
      console.log(error)
  })
})

module.exports = router
