import { configureStore } from "@reduxjs/toolkit";
import cartRed from "./Slices/cartSlice.js";
import authRed from "./Slices/authSlice.js";
import orderRed from "./Slices/orderSlice.js";

const store = configureStore({
  reducer: {
    cart: cartRed,
    auth: authRed,
    order: orderRed,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
