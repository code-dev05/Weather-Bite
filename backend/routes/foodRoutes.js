import express from "express";
import { createFood, getAllFood } from "../controllers/foodController.js";

const router = express.Router();

router.route("/new").post(createFood);
router.route("/").get(getAllFood);
export default router;
