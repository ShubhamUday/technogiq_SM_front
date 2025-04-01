import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import studentReducer from "./studentSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    student: studentReducer,
  },
});

export default store;
