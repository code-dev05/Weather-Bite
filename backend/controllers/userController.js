import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwttoken.js";
import ErrorHandler from "../utils/errorhandler.js";
import Food from "../models/foodModel.js";
import axios from "axios";

export const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, username, password } = req.body;
  const user = await User.create({
    name,
    username,
    password,
  });
  sendToken(user, 201, res);
});

export const loginUser = catchAsyncErrors(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  if (user.password !== password) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  sendToken(user, 200, res);
});

export const logoutUser = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export const getAllUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

export const getUser = catchAsyncErrors(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json(user);
});

export const addRating = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  const { foodId, rating } = req.body;
  user.ratings.push({ food: foodId, rating });
  await user.save();

  const food = await Food.findById(foodId);
  food.rating += rating;
  food.totalRatings += 1;
  await food.save();

  res.status(200).json({ user, food });
});

export const getLocations = catchAsyncErrors(async (req, res) => {
  const location = req.params.location;
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${process.env.MAPS_KEY}&offset=0`
  );
  res.status(200).json(data);
});

export const getWeather = catchAsyncErrors(async (req, res) => {
  const placeId = req.params.placeId;
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.MAPS_KEY}`
  );
  const { lat, lng } = data.results[0].geometry.location;
  const weatherData = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${lat},${lng}&aqi=no`
  );
  res.status(200).json(weatherData.data.current.condition);
});
