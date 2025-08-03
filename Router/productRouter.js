import express from "express";
import { createProduct, deleteProduct, getProduct, putProduct } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/",getProduct);
productRouter.post("/",createProduct);
productRouter.put("/:productID",putProduct);
productRouter.delete("/:productID",deleteProduct);



export default productRouter;