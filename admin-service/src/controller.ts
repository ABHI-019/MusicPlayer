import TryCatch from "./TryCatch.js";
import { Request } from "express";
import getBuffer from "./config/dataUri.js";
import cloudinary from "cloudinary";
import { sql } from "./config/db.js";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

export const addAlbum = TryCatch(async (req: AuthenticatedRequest, res) => {
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

  const result = await sql`
    INSERT INTO album (title, description, thumbnail)
    VALUES (${title}, ${description}, ${cloud.secure_url})
    RETURNING *`;

  res.status(201).json({
    message: "Album created successfully",
    album: result[0],
  });
});

export const addSong = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (req.user?.role !== "admin") {
    res.status(401).json({
      message: "You are not admin",
    });
    return;
  }

  const { title, description, album } = req.body;

  const isAlbum = await sql`SELECT * FROM album WHERE id = ${album}`;

  if (isAlbum.length === 0) {
    res.status(404).json({
      message: "No album with this id",
    });
    return;
  }

  const file = req.file;

  if (!file) {
    res.status(400).json({
      message: "No file to upload",
    });
    return;
  }

  const fileBuffer = getBuffer(file);

  if (!fileBuffer || !fileBuffer.content) {
    res.status(500).json({
      message: "Failed to generate file buffer",
    });
    return;
  }

  const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
    folder: "songs",
    resource_type: "video",
  });

  await sql`
    INSERT INTO songs (title, description, audio, album_id)
    VALUES (${title}, ${description}, ${cloud.secure_url}, ${album})`;

  res.json({
    message: "Song Added",
  });
});
