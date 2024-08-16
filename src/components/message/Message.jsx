import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

const Message = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [socketCon, setsocketCon] = useState();
  const receiverId = searchParams.get("id");
  const server = "http://localhost:8000";

  const [message, setMessage] = useState();

  const [messages, setMessages] = useState([]);

  const { data, id } = useSelector((store) => store.auth);
  console.log(data);
  function sendMessage(message, id) {
    socketCon.emit("sendMsg", { message: message, id: id });
  }
  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setMessages((msg) => [...msg, message]);
    console.log(messages);
    console.log(message);
    sendMessage(message, receiverId);
  };
  useEffect(() => {
    const socket = io(server);
    setsocketCon(socket);
  }, []);

  return (
    <>
      <Navbar id={id} />
      <section className="flex flex-col h-screen max-w-screen-md mx-auto mt-6 mb-6 border-2 border-gray-300 rounded-lg bg-white shadow-lg">
        <header className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-200 text-gray-600">
          <div className="flex items-center space-x-2">
            <i className="fas fa-comment-alt"></i>
            <span>SimpleChat</span>
          </div>
          <div className="cursor-pointer">
            <i className="fas fa-cog"></i>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {/* Display each message */}
          {messages.map((msg, index) => (
            <div key={index} className="flex items-end mb-4 flex-row-reverse">
              <div className="w-12 h-12 ml-4 rounded-full bg-center bg-cover">
                <img src={data.profilePicture ? data.profilePicture : null} />
              </div>
              <div className="max-w-lg p-4 bg-blue-500 text-white rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold">You</div>
                  <div className="text-sm text-gray-200">
                    {new Date().getHours() + ":" + new Date().getMinutes()}
                  </div>
                </div>
                <div>{msg}</div>
              </div>
            </div>
          ))}

          <div className="flex items-end mb-4 flex-row-reverse">
            <div
              className="w-12 h-12 ml-4 bg-gray-300 rounded-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://image.flaticon.com/icons/svg/145/145867.svg')",
              }}
            ></div>
            <div className="max-w-lg p-4 bg-blue-500 text-white rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">Sajad</div>
                <div className="text-sm text-gray-200">
                  {new Date().getHours() + ":" + new Date().getMinutes()}
                </div>
              </div>
              <div>You can change your name in JS section!</div>
            </div>
          </div>
        </main>

        <form
          onSubmit={onSubmit}
          className="flex items-center p-4 border-t border-gray-300 bg-gray-200"
        >
          <input
            type="text"
            onChange={handleChange}
            className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
            placeholder="Enter your message..."
          />
          <button
            type="submit"
            className="ml-4 p-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition"
          >
            Send
          </button>
        </form>
      </section>
    </>
  );
};

export default Message;
