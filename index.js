import express from "express";
import mongoose from "mongoose";
import userRouter from "./Router/userRouter.js";
import productRouter from "./Router/productRouter.js";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json())

app.use(
    (req, res, next) => {
        let token = req.header("Authorization")
        //console.log(token);


        if (token != null) {
            token = token.replace("Bearer ", "")
            jwt.verify(token, "jwt-secret",

                (err, decoded) => {
                    if (decoded == null) {

                        res.status(401).json(
                            {
                                message: "invalid token please log again"
                            }
                        )
                        return
                    } else {
                        req.user = decoded
                        return
                    }
                }

            )
        }
        next();
    }
)
// Database Connection start----------------------------------------------------------------------------------------------------
const connectionString = "mongodb+srv://admin:123@cluster0.upr5lvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(connectionString).then(
    () => {
        console.log("Database Conect succesfully")
    }
).catch(
    () => {
        console.log("Database Conection failed")
    }

)
// Database Connection end----------------------------------------------------------------------------------------------------------

//Routers......

app.use("/user", userRouter)
app.use("/product", productRouter)

//Routers......



app.listen(5000, () => {
    console.log("Server is started succesfully")
    console.log("Listening on port 5000");
}
)