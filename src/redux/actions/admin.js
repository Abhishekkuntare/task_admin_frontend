import { server } from "../store";
import axios from "axios";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllUsersRequest" });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${server}/admin/users`, config);

    dispatch({ type: "getAllUsersSuccess", payload: data.users });
  } catch (error) {
    dispatch({
      type: "getAllUsersFail",
      payload: error.response.data.message,
    });
  }
};
