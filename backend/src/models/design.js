import mongoose, { Schema } from "mongoose";

const DesignSchema = new Schema({
  category: String,
  name: String,
  designImage: {
    name: String,
    url: String,
  },
});

const Design = mongoose.model("Design", DesignSchema);
export default Design;
