require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(()=>{
        app.emit('pronto')
    })
    .catch(e => console.log(e))


const routes = require('./routes') 
const path = require('path')
const { middlewareGlobal } = require('./src/middlewares/middleware')

const PORT = 3000

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(middlewareGlobal)
app.use(routes)

app.on('pronto', ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server executando na porta ${PORT}`)
        console.log(`Acessar http://localhost:${PORT}`)
    })
})
