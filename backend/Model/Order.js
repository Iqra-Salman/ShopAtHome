import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required."],
      ref: "User",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    isDeleiver: {
      type: Boolean,
      default: false,
    },
    deleiverAt: {
      type: Date,
      default: null,
    },
    orderItems: [
      {
        name: String,
        image: String,
        qty: Number,
        price: Number,
        countInStock: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Product is required."],
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      country: String,
      phone: String,
      extraDetails: String,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    shippingPrice: Number,
    saleTax: Number,
    totalPrice: Number,
    paymentMethod: {
      id: String,
      last4: Number,
      brand: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
