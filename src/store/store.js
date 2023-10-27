import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postReducer from "./postsslice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postReducer,
  },
});

export default store;
