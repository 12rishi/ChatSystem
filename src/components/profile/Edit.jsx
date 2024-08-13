import React, { useEffect, useState } from "react";
import API from "../../httpInstance/axiosInstance";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postEdit, setStatus } from "../../../store/authSlice";
import STATUS from "../../../status/status";

const Edit = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { status, error } = useSelector((store) => store.auth);
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    userName: "",
    bio: "",
    profilePicture: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    setEditData({
      ...editData,
      [name]: name === "profilePicture" ? files[0] : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postEdit(editData, id));
  };
  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      dispatch(setStatus(null));
      navigate(`/?id=${id}`);
    } else if (status === STATUS.ERROR) {
      alert(error);
      dispatch(setStatus(null));
    }
  }, [status]);
  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleChange}
              accept="image/*"
              name="profilePicture"
              className="mt-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              name="userName"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              rows="4"
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default Edit;
