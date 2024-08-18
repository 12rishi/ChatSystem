import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/form/Form";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Card from "./components/card/Card";
import Home from "./components/home/Home";
import Edit from "./components/profile/Edit";

import { useSelector } from "react-redux";
import Message from "./components/message/Message";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/editProfile" element={<Edit />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
