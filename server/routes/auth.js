const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/',(request, response)=>{
    response.send("Hello")
})

router.get('/protected', requireLogin, (request, response)=>{
    
    response.send("Hola usuario")
})

router.post('/signup',(request, response)=>{
    const {name,email,password} = request.body
    if(!email || !password || !name)
    {
        return response.status(422).json({error:"Por favor capture todos los campos"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser)
        {
            return response.status(422).json({error:"El usuario con el email ya existe"})
        }
        bcrypt.hash(password,12).then(hashedPassword=>{
            const user = new User({
                email,
                password:hashedPassword,
                name
            })
            user.save().then(user=>{
                response.json({message: "usuario guardado exitosamente"})
            })
            .catch(error=>{
                console.log(error)
            })
        })  
    }).catch(error=>{
        console.log(error)
    })
})

router.post('/signin',(request, response)=>{
    const {email, password} = request.body
    if(!email || !password)
    {
        return response.status(422).json({error:"por favor capture password e email"})
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
            return response.status(422).json({error:"Email o password invalido"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                response.json({token})
            }
            else
            {
                return response.status(422).json({error:"Email o password invalido"})
            }
        })
        .catch(error=>{
            console.log(error)
        })
    })
})
module.exports = router