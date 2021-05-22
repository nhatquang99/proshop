import express from "express";
import multer from 'multer'
import {storage} from '../cloudinary/index.js'
import {
  deleteProduct,
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts

} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const upload = multer({storage});
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, upload.single("image"), updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router;
