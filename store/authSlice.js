import { createSlice } from "@reduxjs/toolkit";
import STATUS from "../status/status";
import API from "../src/httpInstance/axiosInstance";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: null,
    token: null,
    id: null,
    error: null,
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});
export const { setData, setStatus, setToken, setId, setError } =
  authSlice.actions;
export default authSlice.reducer;
export function postRegister(data) {
  return async function postRegisterThunk(dispatch) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const registerReq = await API.post("/register", data);
      if (registerReq.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
        dispatch(setData(registerReq?.data?.data));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
      dispatch(setError(error?.response?.data?.message));
    }
  };
}
export function postLogin(data) {
  return async function postLogin(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const loginReq = await API.post("/login", data);
      if (loginReq.status === 200 && loginReq?.data?.token) {
        dispatch(setStatus(STATUS.SUCCESS));
        dispatch(setToken(loginReq?.data?.token));
        dispatch(setId(loginReq?.data?.data));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
      dispatch(setError(error?.response?.data?.message));
    }
  };
}
export function postEdit(data, id) {
  return async function postEditThunk(dispatch) {
    try {
      const editReq = await API.post(`/edit/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (editReq.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
      dispatch(setError(error?.response?.data?.message));
    }
  };
}
