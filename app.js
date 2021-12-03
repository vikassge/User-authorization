//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
// const encrypt =require("mongoose-encryption");
// const md5=require("md5");.........
const bcrypt =require("bcrypt");
const saltRounds=10;


const app = express();
// const mongoose=require("mongoose");



// console.log(md5("12345"));



console.log(process.env.API_KEY);

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});


const userSchema =new mongoose.Schema({
  email:String,
  password:String

});



// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"]});

const User=new mongoose.model("User",userSchema);



app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});



app.post("/register",function(req,res){

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser=new User({
      email:req.body.username,
      // password:md5(req.body.password)
        // password:md5(req.body.password)
         password:hash
      });
      newUser.save(function(err){
        if(err){
        console.log(err);}
        else{
          res.render("secrets");
        }


      });
    });


});

app.post("/login",function(req,res){
  const username=req.body.username;
  const password = md5(req.body.password);
  user.findOne({email:username},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        if(foundUser.password===password){
          bcrypt.compare(password,foundUser.password, function(err, result) {
    // result == true
    if(result==true){
        res.render("secret");


    }
});

        }

      }
    }
  });
});

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
