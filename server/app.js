const express = require('express')
const app = express()
const PORT = 5500
const mongoose = require('mongoose')
const{MONGOURI} =require('./keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongo")
})

mongoose.connection.on('error', (error)=>{
    console.log("error connecting", error)
})

require('./model/user')
require('./model/student')
require('./model/progress')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/progresses'))
app.use(require('./routes/students'))
app.listen(PORT,()=>{
    console.log("server is running on ", PORT)
})

  