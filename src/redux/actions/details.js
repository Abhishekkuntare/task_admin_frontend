import axios from "axios";
import { server } from "../store";

export const deailsInfo = (Info) => async (dispatch) => {
  try {
    dispatch({ type: "createOrderRequest" });
    const { data } = await axios.post(
      `${server}/basicdetails`,
      {
        Info,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "createOrderSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.response.data.message,
    });
  }
};
