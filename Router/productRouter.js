import express from "express";
import { createProduct, getProduct, putProduct } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/",getProduct);
productRouter.post("/",createProduct);
productRouter.put("/",putProduct);

export default productRouter;