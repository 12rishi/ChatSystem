import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const Card = ({ data, onSubmit }) => {
  const { id } = useSelector((store) => store.auth);
  const handleClick = (dataId) => {
    onSubmit(dataId);
  };
  return (
    <div className="flex flex-col overflow-hidden  p-4 rounded-lg bg-slate-200 shadow-xl  dark:bg-gray-800 dark:text-gray-100 w-[50%] mt-9 ml-5">
      <div className="grow p-5">
        <div className="flex gap-4 ">
          {/* Avatar */}
          <img
            className="mt-1 inline-block size-8 flex-none rounded-full sm:size-12"
            src={data.profilePicture}
            alt="User Avatar"
          />
          {/* Content */}
          <div className="grow text-sm ">
            <p className="mb-1">
              <a
                href="#"
                className="font-semibold text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {data.userName}
              </a>
            </p>
            <p> {data.bio}</p>
            <p className="space-x-2">
              <button
                onClick={() => handleClick(data.id)}
                className=" text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Like :{data.likes}
              </button>
              <Link
                to={`/message?id=${data.id}`}
                className=" text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Chat
              </Link>
            </p>
          </div>
          {/* END Content */}
        </div>
      </div>
    </div>
  );
};

export default Card;
