


import Product from "../Model/product.js";
import expressAsyncHandler from "express-async-handler";

export const getAll = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

export const getAllByid = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const selectedProduct = await Product.findById(id);
  if (!selectedProduct) {
    res.status(404);
    throw new Error("Product not found.");
  }
  res.json(selectedProduct);
});


//createProduct

export const createProduct=expressAsyncHandler(async(req,res)=>{
  const product=new Product({
user:req.user._id,
name:"Product name",
price:0,
category:"Boys",
fabric:"Cotton",
color:"Black"
  })

const newProduct=await product.save();
res.json({
  _id: newProduct._id
})
  
})


//Edit Product
// PATH    :    /api/products/:id
// METHOD  :    PUT
// ACCESS  :    Privete && Admin
// DEsc    :    Edit Prodduct

export const editProduct = expressAsyncHandler(async(req,res)=>{
  const {id}=req.params;
  const product = await Product.findById(id);

  if(!product){
    res.status(404);
    throw new Error("Product not found");
  }
  const {
    name,
    price,
    description,
    category,
    fabric,
    color,
    image,
    countInStock
  }=req.body;

  product.name=name;
  product.price=price,
  product.description=description,
  product.category=category,
  product.fabric=fabric;
  product.color=color;
  product.image=image;
  product.countInStock=countInStock;

  const updatedProduct=await product.save();
  res.json(updatedProduct)
})


//delete product
// PATH:   /api/products/:id

export const deleteProduct=expressAsyncHandler(async(req,res)=>{
  const {id}=req.params;
  console.log(id)
  const product= await Product.findByIdAndDelete(id)
  if(!product){
    res.status(404);
    throw new Error("Product not found")
  }
 const deleteProduct=product;
  res.json(deleteProduct)
 
})