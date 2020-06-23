import mongoose, { Schema } from "mongoose";

const PortfolioSchema = new Schema({
  title: String,
  body: String,
  category: String,
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;
