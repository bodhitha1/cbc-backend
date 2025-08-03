import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function getProduct(req,res){

    Product.find().then(
        (data)=>{

            res.json(data)
        }
    ).catch(

        ()=>{
            res.status(404).json(
                {
                    message : "Insuffisunt product dtails"
                }
            )
        }
    )
}
export async function createProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(404).json({
            message: "Unauthorized access!, only admin can use this feature"
        });
        return;
    }
    try {
        const productData = req.body;
        const product = new Product(productData);
        console.log(product);
        

        await product.save();

        res.status(200).json({
            message: "Product created successfully",
            product: product,
        });
        
    } catch (err) {
        res.status(500).json({
            message: "Error creating product",
            error: err.message
        });
    }
}
export async function putProduct(req,res) {
        if (!isAdmin(req)) {
        res.status(404).json({
            message: "Unauthorized access!, only admin can use this feature"
        });
        console.log("hello");
        
        return;
    }
    try{

        const productID = req.params.productID;
        console.log();
        
        const updatedData = req.body;

        await Product.updateOne(
            {productID: productID},
            updatedData
        );

        res.status(200).json(
            {
                message:"product updated sucessfully!"
            }
        );

    }
    catch(err){
        console.error(err)
        res.status(500).json(
            {
                message:"Failed to update product!"
            }
        );
    }
    
}
export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to delete a product"
        });
        return;
    }
    try{

        const productID = req.params.productID
        

        await Product.deleteOne({
            productID : productID
        })

        res.json({
            message: "Product deleted successfully"
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Failed to delete product",
        });
    }
}