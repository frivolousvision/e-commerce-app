import { createSlice } from "@reduxjs/toolkit";

export const inCartOptions = {
  name: "inCart",
  initialState: false,
  reducers: {
    setCartTrue: (state) => {
      return (state = true);
    },
    setCartFalse: (state) => {
      return (state = false);
    },
  },
};

export const inCartSlice = createSlice(inCartOptions);
export const selectInCart = (state) => state.inCart;
export const { setCartTrue, setCartFalse } = inCartSlice.actions;
export default inCartSlice.reducer;
