import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "Please login to access this resource",
            });
            return;
        }
        const { data } = await axios.get(`${process.env.User_URL}/api/v1/user/me`, {
            headers: {
                token
            }
        });
        req.user = data; // Assign the user data to the request object
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Please login to access this resource",
        });
    }
};
//multer setup
import multer from 'multer';
const storage = multer.memoryStorage(); // Store files in memory
const uploadFile = multer({ storage }).single('file'); // Use 'file' as the field name for the file upload
export default uploadFile;
