import express from "express";
import { registerUser, loginUser } from "../controller/user.js";
import { addProduct, deleteProduct } from "../controller/product.js";








const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);



router.post("/addproduct", addProduct);
router.delete("/deleteproduct/:id", deleteProduct);