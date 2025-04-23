import express  from "express";
import { getAllAlbums, getAllsongs, getAllsongsOfAlbum, getSingleSong } from "./controllers.js";

const router = express.Router();

router.get("/album/all",getAllAlbums);
router.get("/song/all",getAllsongs);
router.get("/album/:id",getAllsongsOfAlbum);
router.get("/song/:id",getSingleSong);

export default router;