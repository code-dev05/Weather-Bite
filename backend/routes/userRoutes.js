import express from "express";
import {
  addRating,
  getAllUsers,
  getLocations,
  getUser,
  getWeather,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/ratings").post(isAuthenticatedUser, addRating)
router.route("/location/:location").get(getLocations)
router.route("/weather/:placeId").get(getWeather);
router.route("/:userId").get(getUser);

export default router;
