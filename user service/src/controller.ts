import { User } from "./model.js";
import TryCatch from "./TryCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = TryCatch(async(req,res)=>{
    const  {name,email,password} = req.body;
    let user =await User.findOne({email});
    if(user){
        res.status(400).json({
            msg:"user Already Exist"
        });

        return;

    }
    const hashPassword = await bcrypt.hash(password,10);
    user =await User.create({
        name,
        email,
        password:hashPassword
    });

    const token = jwt.sign({_id: user._id},process.env.JWT_SEC as string,{
        expiresIn:"7d",
    });

    res.status(201).json({
        msg:"user Registered",
        user,
        token
    });
});