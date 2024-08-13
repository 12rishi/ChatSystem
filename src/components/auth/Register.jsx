import React, { useEffect, useState } from "react";
import Form from "../form/Form";
import API from "../../httpInstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import { postRegister, setStatus } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../../../status/status";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((store) => store.auth);

  const onSubmit = async (data) => {
    dispatch(postRegister(data));
  };
  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      dispatch(setStatus(null));
      navigate("/login");
    } else if (status === STATUS.ERROR) {
      dispatch(setStatus(null));
      alert(error);
    }
  }, [status]);
  return (
    <>
      <Form auth={"register"} onSubmit={onSubmit} />
    </>
  );
};

export default Register;
