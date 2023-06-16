import express from "express";
import {
  getUserProfile,
  imageUpload,
  login,
  register,
} from "../controller/usersController.js";
import multerUpload from "../middleware/multer.js";
import jwtAuth from "../middleware/jwtAuth.js";
import jwtAuthCustom from "../middleware/jwtAuth.js";
const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), imageUpload);

router.post("/register", register);

router.post("/login", login);

router.get("/userProfile", jwtAuth, getUserProfile);
// router.get("/userProfile", jwtAuthCustom, getUserProfile);

export default router;
