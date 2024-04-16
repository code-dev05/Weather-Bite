import express from "express";
import {
  createFood,
  getAllFood,
  getFood,
  getFoodByWeather,
} from "../controllers/foodController.js";

const router = express.Router();

router.route("/new").post(createFood);
router.route("/").get(getAllFood);
router.route("/:foodId").get(getFood);
router.route("/weather/:weather").get(getFoodByWeather);
export default router;
