import { createSlice } from "@reduxjs/toolkit";

export const cartCountOptions = {
  name: "cartCount",
  initialState: 0,
  reducers: {
    setCartCount: (state, action) => {
      return (state = action.payload);
    },
    incrementCart: (state, action) => {
      return state + 1;
    },
    decrementCart: (state, action) => {
      return state - 1;
    },
  },
};

export const cartCountSlice = createSlice(cartCountOptions);
export const selectCartCount = (state) => state.cartCount;
export const { setCartCount, incrementCart, decrementCart } =
  cartCountSlice.actions;
export default cartCountSlice.reducer;
