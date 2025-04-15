import {NextFunction,Request,Response} from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

interface IUser{
    _id:string,
    name:string,
    email:string,
    password:string,
    role:string,
    playlist:string[];
}

interface AuthenticateRequest extends Request {
    user?: IUser| null; // Add the user property to the request object
}

export const isAuth=async(req:AuthenticateRequest,res:Response,next:NextFunction):
    Promise<void>=>{
        try{
            const token = req.headers.token as string;

            if(!token){
                res.status(403).json({
                    message:"Please login to access this resource",
                });
                return;
            }

            const {data} = await axios.get<IUser>(`${process.env.User_URL}/api/v1/user/me`,{
                headers:{
                    token
                }
            });

            req.user = data; // Assign the user data to the request object
            next();
        }catch(error){
            res.status(403).json({
                message:"Please login to access this resource",
            })
        }
    }

//multer setup
import multer from 'multer';


const storage = multer.memoryStorage(); // Store files in memory
const uploadFile = multer({ storage }).single('file'); // Use 'file' as the field name for the file upload

export default uploadFile;
