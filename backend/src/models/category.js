import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  category: String,
});

const Category = mongoose.model("category", CategorySchema);
export default Category;
