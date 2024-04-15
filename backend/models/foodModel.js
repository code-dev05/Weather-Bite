import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nutrition: {
    type: String,
    required: true,
  },
  recipe: [{
    type: String,
    required: true,
  }],
  image: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  }
});

const Food = mongoose.model("Food", foodSchema);
export default Food;
