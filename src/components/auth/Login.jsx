import React, { useEffect, useState } from "react";
import Form from "../form/Form";
import API from "../../httpInstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, setStatus } from "../../../store/authSlice";
import STATUS from "../../../status/status";
import { io } from "socket.io-client";
const server = "http://localhost:8000";
const socket = io.connect(server);

const Login = () => {
  const [newCon, setNewCon] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, token, id } = useSelector((store) => store.auth);
  const onSubmit = async (data) => {
    dispatch(postLogin(data));
    socket.emit("storeSocketId", data);
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      localStorage.setItem("jsonToken", token);
      dispatch(setStatus(null));
      navigate(`/?id=${id}`);
    } else if (status === STATUS.ERROR) {
      dispatch(setStatus(null));
      alert(error);
    }
  }, [status]);

  return <Form auth={"login"} onSubmit={onSubmit} />;
};

export default Login;
