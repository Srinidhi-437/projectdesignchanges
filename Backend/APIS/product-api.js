const exp = require("express");
const productApiObj = exp.Router();
const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")



 const Product=require("../Models/Product");
// const CartDummySchema = require("../Models/Cart-dummy");


productApiObj.use(exp.json())
require("dotenv").config()



// -------------------------------UPDATE PRODUCT---------

productApiObj.put("/updateproduct", errorHandler ( async(req,res,next)=>{
    
    // console.log(req.body)
    let updatedprod = await Product.updateOne(

        {productid:req.body.productid},
        {$set:
                 {category:req.body.category,
                // productid:req.body.productid,
                productname:req.body.productname,
                // written here new one
                
                productprice:req.body.productprice,
                productdescription:req.body.productdescription,
                productimage:req.body.productimage},multi:true}

        )
        // res.send({message:updatedprod})
         await updatedprod.save()
        res.send({message:"updated"})
   

}))


// deleting product by admin
productApiObj.post("/removeproduct", errorHandler( async(req,res,next)=>{
    // let productCollectionObj=req.app.get("productCollectionObj");
    // let userObj=req.body;
    //  console.log("hello iam admin deleted obj from backend",req.body)
    //  console.log(req.body.productid)
    let prodtobedeleted = await Product.deleteOne(
        {productid:req.body.productid},
        {$set:
            {category:req.body.category,
           // productid:req.body.productid,
           productname:req.body.productname,
           // written here new one
           
           productprice:req.body.productprice,
           productdescription:req.body.productdescription,
           productimage:req.body.productimage},multi:true}

    )
    await prodtobedeleted.save();
    res.send({message:"product removed"})
    // let user=await productCollectionObj.findOne({productname:userObj.productname})
    // console.log(user)
    //if product is existed
    // if(user!==null){
    // //add product
    //         let success=await productCollectionObj.deleteOne({productname:userObj.productname})
    //         res.send({message:"product removed"})
    // }
//   else{
//       res.send({message:"product not found"})
//   }
}))


// --------------------retriving product--------------------------

productApiObj.get("/cardstohome",errorHandler ( async(req,res,next)=>{
    // const productCollectionObj=req.app.get("productCollectionObj")
    // let success=await productCollectionObj.find().toArray()
    let success = await Product.find()
    res.send({message:success})



   
}))

// --------------------------------------------------------------------------------------------------------------
// remove product by id in usercart
// productApiObj.post("/removeprodfromcart",errorHandler(async(req,res,next)=>{
//     console.log("iam from removeprodfromcart is",req.body)
//     let prodtobedeletedfromcart = await Product.deleteOne(
       

//         {$and:[{username:req.body.username},{product.productid:req.body.id}]})
//         res.send({message:"deleted successfully"})
        
//         // console.log("deleted prod is",prodtobedeletedfromcart)
      
     
// }))















// delete item by muk
// productApiObj.put("/deleteproduct",errorHandler(async(req,res,next)=>{
//     console.log(req.body);
//     let success = await Product.updateOne({productid:req.body.productid},{status:req.body.status})
//     console.log(success)
// }))





// get dals-pulses component
productApiObj.get("/getproductsofdals",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Dals&Pulses"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))


// get fours-grains
productApiObj.get("/getfloursgrains",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Flours & Grains"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))

// get riceproducts
productApiObj.get("/getriceproducts",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Rice Products"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))

// get dryfruits
productApiObj.get("/getdryfruits",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Dry Fruits"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))


// get spicesmasalas
productApiObj.get("/getspicesmasalas",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Spices & Masalas"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))

// get cooking oils
productApiObj.get("/getcookingoils",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Cooking Oils"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))

// get Dairy Products
productApiObj.get("/getdairyproducts",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Diary Products"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))

// get Dairy Products
productApiObj.get("/getsaltsSugars",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Salt,Sugar&Jaggery"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))

// get BreakFast cereals
productApiObj.get("/getbreakfastcereals",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Breakfast Sereals"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))


// get Others array
productApiObj.get("/getothersarray",errorHandler(async(req,res,next)=>{
    let dalsproduct = await Product.find({category:"Other Grocery"})
    // console.log("from api",req.body)
    res.send({message:dalsproduct})
}))





// exporting admin-api
module.exports = productApiObj;