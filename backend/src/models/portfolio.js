import mongoose, { Schema } from "mongoose";

const PortfolioSchema = new Schema({
  id: String,
  client: String,
  host: String,
  type: {
    web: Boolean,
    singlePage: Boolean,
  },
  version: {
    pc: Boolean,
    mobile: Boolean,
  },
  responsiveWeb: Boolean,
  IEVersion: String,
  skill: [String],
  animationEvent: [String],
  period: {
    startDate: {
      year: String,
      month: String,
    },
    endDate: {
      year: String,
      month: String,
    },
  },
  worker: String,
  url: [String],
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;
