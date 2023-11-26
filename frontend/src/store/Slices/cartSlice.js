import { createSlice } from "@reduxjs/toolkit";
const cartItemStorageName = "cartItems";
const shippingAddressName = "shippingAddress";

let cartItemsFromStorage = localStorage.getItem(cartItemStorageName);
try {
  cartItemsFromStorage =
    cartItemsFromStorage && JSON.parse(cartItemsFromStorage)
      ? JSON.parse(cartItemsFromStorage)
      : [];
} catch (err) {
  cartItemsFromStorage = [];
}
let shippingAddressFromStorage = localStorage.getItem(shippingAddressName);
try {
  shippingAddressFromStorage =
    shippingAddressFromStorage && JSON.parse(shippingAddressFromStorage)
      ? JSON.parse(shippingAddressFromStorage)
      : null;
} catch (err) {
  shippingAddressFromStorage = null;
}
const calculateSubTotal = (cartItems) => {
  return cartItems.reduce((pre, cur) => {
    return (pre += cur.price * cur.qty);
  }, 0);
};

const calculateShippingPrice = (cartItems) => {
  const subTotal = calculateSubTotal(cartItems);
  if (subTotal < 5000) {
    return 200;
  }
  return 0;
};

const calculateSaleTax = (cartItems) => {
  const subTotal = calculateSubTotal(cartItems);
  return Math.round((subTotal / 100) * 16);
};

const calculateTotalPrice = (cartItems) => {
  return (
    calculateSubTotal(cartItems) +
    calculateSaleTax(cartItems) +
    calculateShippingPrice(cartItems)
  );
};

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  subTotal: calculateSubTotal(cartItemsFromStorage),
  shippingPrice: calculateShippingPrice(cartItemsFromStorage),
  saleTax: calculateSaleTax(cartItemsFromStorage),
  totalPrice: calculateTotalPrice(cartItemsFromStorage),
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const isExist = state.cartItems.find(
        (item) => item.product === payload.product
      );
      if (isExist) {
        // update
        state.cartItems = state.cartItems.map((item) =>
          item.product === payload.product ? payload : item
        );
      } else {
        // add
        state.cartItems = [...state.cartItems, payload];
      }
      localStorage.setItem(
        cartItemStorageName,
        JSON.stringify(state.cartItems)
      );
      state.subTotal = calculateSubTotal(state.cartItems);
      state.saleTax = calculateSaleTax(state.cartItems);
      state.shippingPrice = calculateShippingPrice(state.cartItems);
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product != payload
      );
      localStorage.setItem(
        cartItemStorageName,
        JSON.stringify(state.cartItems)
      );
      state.subTotal = calculateSubTotal(state.cartItems);
      state.saleTax = calculateSaleTax(state.cartItems);
      state.shippingPrice = calculateShippingPrice(state.cartItems);
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
    addShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
      localStorage.setItem(shippingAddressName, JSON.stringify(payload));
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = null;
      state.subTotal = 0;
      state.saleTax = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
      localStorage.setItem(cartItemStorageName, []);
      localStorage.setItem(shippingAddressName, null);
    },
  },
});

export const { addToCart, removeFromCart, addShippingAddress, emptyCart } =
  cart.actions;

export default cart.reducer;
