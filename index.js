import express from "express";
import mongoose from "mongoose";

import userRouter from "./Router/userRouter.js";
import productRouter from "./Router/productRouter.js";
import jwt from "jsonwebtoken"

const app = express()

app.use(express.json());
app.use(
    (req,res,next)=>{
        let token = req.header["Authorization"]
            if(token !== null){
                token = token.replace("Bearer ","")
                console.log(token)
                jwt.verify(token, "jwt-secret", 
                    (err, decoded)=>{

                        if(decoded == null){
                            res.json(
                                {
                                    message : "Invalid token please login again"
                                }
                            )
                        }else{
                            req.user = decoded
                        }
                })
            }
            next()


    }

)


// Database Connection start----------------------------------------------------------------------------------------------------
const connectionString = "mongodb+srv://admin:123@cluster0.upr5lvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database Conect succesfully")
    }
).catch(
     ()=>{
        console.log("Database Conection failed")
    }

)
// Database Connection end----------------------------------------------------------------------------------------------------------

//Routers......

app.use("/user",userRouter)
app.use("/product", productRouter)

//Routers......



app.listen(5000, ()=>{
    console.log("Server is started succesfully")
    console.log("Listening on port 5000");
}
)