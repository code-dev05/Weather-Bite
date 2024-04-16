import Food from "../models/foodModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import axios from "axios";

export const createFood = catchAsyncErrors(async (req, res) => {
  const food = await Food.create(req.body);
  res.status(201).json(food);
});

export const getAllFood = catchAsyncErrors(async (req, res) => {
  const foods = await Food.find({});
  res.status(200).json(foods);
});

export const getFoodByWeather = catchAsyncErrors(async (req, res) => {
  const weather = req.params.weather;
  const foods = await Food.find({weather})
  res.status(200).json(foods)
})

export const getFood = catchAsyncErrors(async (req, res) => {
  const foodId = req.params.foodId;
  const food = await Food.findById(foodId);
  res.status(200).json(food)
})