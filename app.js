var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const fs = require('fs'); 

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Vimal',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
var db= mongoose.connection;

db.on('error',()=>console.log("error in connecting to database"))
db.once('open',()=>console.log("Connected to Database"))

app.post("/login",(req,res)=>{
    var uname =req.body.uname;
    var pass = req.body.pass;

    var data = {
        "username":uname,
        "password": pass
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err)
        {
            throw err;
        }
        console.log("Record Inserted successfully");

    });

    return res.redirect('success.html')
})

app.get("/",(req,res)=>{
    res.set({
     
        "Allow-acess-Allow-origin": '*'
    })
    return res.redirect('./index.html');

}).listen(3001, '127.0.0.1');


console.log("Listening on PORT 3001");