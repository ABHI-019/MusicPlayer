import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from "cloudinary";
import { sql } from "./config/db.js";
export const addAlbum = TryCatch(async (req, res) => {
    console.log("req.user:", req.user);
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "You are not admin",
        });
        return;
    }
    const { title, description } = req.body;
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "Please upload a file",
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({
            message: "Failed to Generate file",
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "album",
    });
    const result = await sql `
    INSERT INTO album (title, description, thumbnail)
    VALUES (${title}, ${description}, ${cloud.secure_url}) RETURNING *`;
    res.status(201).json({
        message: "Album created successfully",
        album: result[0],
    });
});
