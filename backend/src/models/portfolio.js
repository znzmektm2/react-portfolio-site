import mongoose, { Schema } from "mongoose";

const PortfolioSchema = new Schema({
  id: String,
  client: String,
  host: String,
  web: Boolean,
  singlePage: Boolean,
  pcVer: Boolean,
  mobileVer: Boolean,
  responsiveWeb: Boolean,
  IEVersion: String,
  skill: [String],
  animationEvent: [String],
  workYear: String,
  workMonth: String,
  period: String,
  worker: String,
  url: [String],
  thumbImage: {
    name: String,
    url: String,
  },
  contentImage: {
    name: String,
    url: String,
  },
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;
