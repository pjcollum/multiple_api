const bodyParser = require("body-parser")
const hbs = require('express-handlebars')
//const mongoose = require('mongoose')
const path = require('path')
const express = require('express')
const app = express();

const routes = require('./routes/router')   //import router.js

require('dotenv').config();

//mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@usersignup-lqnk3.mongodb.net/userdb?retryWrites=true&w=majority`,{
//useNewUrlParser: true,
//    useUnifiedTopology: true
//})

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', routes);


app.engine('.hbs',hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
})); 

app.set('view engine','.hbs');

app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
})