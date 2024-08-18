import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Card from "../card/Card";
import API from "../../httpInstance/axiosInstance";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [like, setLike] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState([]);
  const [socketCon, setSocketCon] = useState(null);
  const { data } = useSelector((store) => store.auth);
  console.log(data);

  const id = searchParams.get("id");
  const server = "http://localhost:8000";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userReq = await API.get("/users");
        if (userReq.status === 200) {
          return setUserData(userReq.data.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    setUserId(id);
    fetchUserData();
  }, [like]);
  useEffect(() => {
    const newCon = io(server);
    setSocketCon(newCon);
    return () => {
      if (socketCon) {
        socketCon.disconnect();
      }
    };
  }, []);
  const handleClick = (dataId) => {
    socketCon.emit("liked", { userId, dataId });
    socketCon.on("likesCount", ({ likesCount, dataId }) => {
      setLike(likesCount);
    });
  };
  return (
    <>
      <Navbar />
      {userData.map((datas) => {
        return <Card data={datas} onSubmit={handleClick} />;
      })}
    </>
  );
};

export default Home;
