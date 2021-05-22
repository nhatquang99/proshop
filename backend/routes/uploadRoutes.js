import express from 'express'
import multer from 'multer'
import {storage} from '../cloudinary/index.js'

const router = express.Router();

const upload = multer({storage});

router.post("/", upload.single("image"), (req, res) => {
  console.log("IN");
  res.send(`${req.file.path}`)
});

export default router
