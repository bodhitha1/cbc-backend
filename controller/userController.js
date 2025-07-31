import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function getUser (req,res){

    User.find().then(
        (data)=>
            res.json(data)
    ).catch(
        ()=>
            res.json(
                {
                    message : "Insufficent User details"
                }
            )
    )
}
export function createUser(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const user = new User(
        {
            email: req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : hashedPassword,
            role: req.body.role 
        }

    )
    user.save().then(

        ()=>{
            res.json(
                {
                    message:"Create User Succesfully"
                }
            )
        }
    ).catch(

         ()=>{
            res.json(
                {
                    message:"Create User Succesfully"
                }
            )
        }
    )
     console.log("POST Recuest recived for Router")

}
export function loginUser(req,res){
    User.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user)=>{
            if (user == null){

                res.status(404).json(
                    {
                        message :"User not funded"
                    }
                
                )
            }else{

                const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password)

                if(isPasswordMatching){

                    const token = jwt.sign(
                        {
                           email: user.email,
                           firstName : user.firstName,
                           lastName : user.lastName,
                           role: user.role,
                           isBlock : user.isBlock,
                           isEmailVerified : user.isEmailVerified 
                        },
                        "jwt-secret",
                    )

                    res.status(200).json(
                        {
                            message : "Login Succesfully",
                            token : token
                        }
                    )
                }else{

                    res.json(
                        {
                            message : "Invalid password"
                        }
                    )
                }


            }
        }
    )
}
export function isAdmin(req){

    if (req.user == null){
        return false;
    }
    if (req.user.role != "Admin"){
        return false
    } 
    return true;
}