import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Order from "../Model/Order.js";

// PATH     :   /api/orders
// METHOD   :   Post
// ACCESS   :   Private
// Desc     :   Create new order
export const createOrder = asyncHandler(async (req, res) => {
  const stripe = new Stripe(
    "sk_test_51O7sPoATKMOwGEo9Exn3VLwohdtpvcZUce4eupuBHFqFleSHKbIzoTguqC77h7DYQGDrqWwMnYgu65btkLPrYZps00wWb7V9rT"
  );
  const user = req.user;
  const {
    orderItems,
    shippingAddress,
    subTotal,
    saleTax,
    shippingPrice,
    totalPrice,
    paymentMethod,
  } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "PKR",
      confirm: true,
      payment_method: paymentMethod.id,
      description: `${user.name} ordered ${orderItems.length} items.`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Unable to process order.");
  }

  const order = new Order({
    orderItems,
    shippingAddress,
    subTotal,
    shippingPrice,
    saleTax,
    totalPrice,
    paymentMethod,
    isPaid: true,
    paidAt: new Date(),
    user: user._id,
  });
  const createdOrder = await order.save();

  // Update countInStock for products

  res.status(201);
  res.json({
    _id: createdOrder._id,
  });
});

// PATH     :   /api/orders/:id
// METHOD   :   GET
// ACCESS   :   Private
// Desc     :   Get order by orderId
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  console.log(order);
  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }
  res.json(order);
});
// PATH     :   /api/admin/orders
// METHOD   :   GET
// ACCESS   :   Private
// Desc     :   Get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({});
  console.log(order);
  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }
  res.json(order);
});
