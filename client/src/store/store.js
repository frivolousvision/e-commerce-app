import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from "../features/cartCountSlice";
import inCartReducer from "../features/inCartSlice";

const store = configureStore({
  reducer: {
    cartCount: cartCountReducer,
    inCart: inCartReducer,
  },
});

export default store;
