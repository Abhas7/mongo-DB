const http = require("http")
const express = require('express') //model
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const multer=reuire('multer')


const website = express() //express function to create webpages


website.use(express.static('public'))

website.set('views', __dirname + '/views') 

website.set('view engine', 'ejs') //render all files
website.use(bodyParser.urlencoded({ extended:true }))


const storage = multer.diskstorage({
   destination:'/public/productImage',
   filename: (req, file, temp)=>{ 
      temp(null,file.originalname)
   }
})


mongoose.connect('mongodb://localhost:27017/admin')

const registerSchema = new mongoose.Schema({

    fname:String, 
    pname:Number,
})

const register = mongoose.model('register',registerSchema)


website.get('/register', async (req,res)=> {
   res.render('register')
} )   

website.post('/submit', async (req,res) => {
   const {fname, pname} = req.body

   const registerForm = register({ 
      fname,
      pname,
   })
  await registerForm.save()
  res.send("data submitted")

  // res.redirect('/contact') 


})
website.get('/add_product',async (req, res)=>{

})


website.listen(3000,()=>{
   console.log("server created successfully") 
})











// default function -> non parameterized 
// parameterized function 
// callback -> arrow function


// {}

// MERN - MongoDb , Express js, Node js












































































































































































