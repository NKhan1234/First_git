const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
const { log } = require("console");
mongoose.connect('mongodb://127.0.0.1:27017/contact_website',{useNewUrlParser: true});
const port = 9100;

var contactSchema = new mongoose.Schema({
    name: String,
    address: String, 
    email: String,
    message: String 
    
  });
var contact = mongoose.model('Contact', contactSchema);



app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

app.get('/', (req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
})

app.get('/explore', (req,res)=>{
    const params = {}
    res.status(200).render('explore.pug',params);
})
app.get('/history', (req,res)=>{
    const params = {}
    res.status(200).render('history.pug',params);
})
app.get('/contact', (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params);
})






app.post('/contact', (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})



app.listen(port, ()=>{
    console.log('The application started successfully on port ${port}');
});