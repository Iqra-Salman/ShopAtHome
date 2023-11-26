import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      //   ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price should be a positive number"],
    },
    description: {
      type: String,
      max: [0, "Description should be less than 1000 chars"],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    fabric: {
      type: String,
      required: [true, "Fabric is required."],
    },
    color: {
      type: String,
      required: [true, "Color is required."],
    },
    image: {
      type: String,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
