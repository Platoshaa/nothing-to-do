import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import skillSlice from "./slices/skillSlice";
import taskSlice from "./slices/taskSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    skill: skillSlice,
    task: taskSlice,
  },
});
