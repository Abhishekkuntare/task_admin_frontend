import { configureStore } from "@reduxjs/toolkit";
import { profileReducer, userReducer } from "./reducers/userReducer";
import { adminReducer } from "./reducers/adminReducer";
import { detailsReducer, orderReducer } from "./reducers/detailsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    admin: adminReducer,
    details: detailsReducer,
    order: orderReducer,
  },
});

export default store;

// export const server = "https://task-xi-ten.vercel.app";
export const server = "https://task-admin.onrender.com/api/v1";
