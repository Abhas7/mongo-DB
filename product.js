const http = require("http")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require('multer')

const website = express()
website.use(express.static('public'))
website.set('views', __dirname + '/views')
website.set('view engine', 'ejs')
website.use(bodyParser.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: 'public/product/',
    filename: (req, file, temp) => {
        temp(null, file.originalname)        
    }
})
const upload = multer({storage:storage})

mongoose.connect('mongodb://localhost:27017/new')
const addproductSchema = new mongoose.Schema({
            product_name:String,
            productimage:String,
            price:Number,
            description:String,

})
const addproductdata = mongoose.model('addproductdata', addproductSchema)

 website.get('/addproduct', async (req,res) =>{
    res.render('addproduct')
 })
website.post('/product', upload.single('productimage'), async (req,res) => {
    const {product_name,price,description} = req.body
    const productimage ='/product/' + req.file.originalname
    const addproductData = new addproductdata({
        product_name,
        productimage,
        price,
        description,

    })

        await addproductData.save()

        res.send("data submitted")
})

website.get('/products', async (req, res) =>{
    const fetchData = await productdata.find()
         res.render('fproduct', {fetchData})
        })
website.listen(3000,()=>{
    console.log("server created successfully")
})