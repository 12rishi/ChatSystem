import React, { useEffect, useRef, useState } from "react";

const Form = ({ onSubmit, auth }) => {
  const [formdata, setFormdata] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formdata);
  };

  return (
    <>
      <form className="space-y-6 dark:text-gray-100" onSubmit={handleSubmit}>
        {auth === "register" ? (
          <div className="space-y-1">
            <label htmlFor="email" className="font-medium">
              UserName:
            </label>
            <input
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter your Username"
              onChange={handleChange}
            />
          </div>
        ) : null}
        <div className="space-y-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email.."
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password.."
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
        >
          {auth === "register" ? "Create" : "Login"}
        </button>
      </form>
    </>
  );
};

export default Form;
