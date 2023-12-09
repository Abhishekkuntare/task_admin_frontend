import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  Info: localStorage.getItem("Info ")
    ? JSON.parse(localStorage.getItem("Info"))
    : {},
};

export const orderReducer = createReducer(
  {},
  {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

export const detailsReducer = createReducer(initialState, {
  detailsInfo: (state, action) => {
    state.Info = {
      hNo: action.payload.hNo,
      city: action.payload.city,
      country: action.payload.country,
      state: action.payload.state,
      pinCode: action.payload.pinCode,
      phoneNo: action.payload.phoneNo,
    };
  },
});
