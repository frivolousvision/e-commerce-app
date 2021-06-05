import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from "../features/cartCountSlice";

const store = configureStore({
  reducer: {
    cartCount: cartCountReducer,
  },
});

export default store;
