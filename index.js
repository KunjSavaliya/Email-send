var express  =  require('express');
var http = require('http');
var path = require('path');
var nodemailr = require('nodemailer');
const { clear, log } = require('console');
const { response } = require('express');

var app= express();
var server = http.Server(app);
var port = 500;


app.set("port",port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"static")));


app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,'static/index.html'))
})

app.post("/send_email",function(req,res){
    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;

var transporter = nodemailr.createTransport({
    service:'gmail',
    auth:{
        user:'kunjsavaliya.2003@gmail.com',
        pass:'ryqcsdvpqbdzukny'
    }
});
 
var mailOptions = {
    from: from,
    to:to,
    subject:subject,
    text:message

};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error)
    }else{
        console.log("Email Sent:" + info.response);
    }
    response.redirect("/")
})

})

server.listen(port, function(){
    console.log("start"+ port);
})

console.clear()
