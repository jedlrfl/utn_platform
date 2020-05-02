const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (request, response, next)=>{
    const {authorization} = request.headers
    if (!authorization) {
        return response.status(401).json({error:"debes iniciar sesion"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (error, payload)=>{
        if (error) {
            return response.status(401).json({error:"debes iniciar sesion"})
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            request.User = userdata
        })
        next()
    })    
}