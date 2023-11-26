import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: null,
  success: false,
};
const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrder: (state, { payload }) => {
      state.orderId = payload;
      state.success = true;
    },
    ResetOrder: (state) => {
      state.orderId = null;
      state.success = false;
    },
  },
});
export const { setOrder, ResetOrder } = orderSlice.actions;
export default orderSlice.reducer;
