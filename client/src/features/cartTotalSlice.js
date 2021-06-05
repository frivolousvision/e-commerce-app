import { createSlice } from "@reduxjs/toolkit";

export const cartTotalOptions = {
  name: "cartTotal",
  initialState: 0,
  reducers: {
    setCartTotal: (state, action) => {
      return (state = action.payload);
    },
  },
};

export const cartTotalSlice = createSlice(cartTotalOptions);
export const selectCartTotal = (state) => state.cartTotal;
export const { setCartTotal } = cartTotalSlice.actions;
export default cartTotalSlice.reducer;
