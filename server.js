const express = require('express')
const app = express()
const port = process.env.PORT||3000
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = express.Router()
const appRoutes = require('./app/routes/api')(router)


mongoose.connect('mongodb://admin:admin@localhost:27017/mean', { useNewUrlParser: true }, (err)=>{
    if(err){
        console.log(`Mongo connection failed! ${err}`)
    }else{
        console.log('MongoDB connected')
    }
})

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', appRoutes)
app.use(express.static(__dirname+'/public'))

app.get('*', (req,res)=>{
    res.sendFile(__dirname+'/public/app/index.html', err=>{
        if(err){res.json({success: false, message: 'Ooo ops, something went wrong'})}
    })
})
app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})