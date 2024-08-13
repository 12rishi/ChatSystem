import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/form/Form";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Card from "./components/card/Card";
import Home from "./components/home/Home";
import Edit from "./components/profile/Edit";
import Timer from "./components/Timer/Timer";
import store from "../store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/editProfile" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
