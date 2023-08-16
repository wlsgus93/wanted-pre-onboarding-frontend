import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Todo from "../pages/todo";
import Home from "../pages/home"
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path="signin" element={<Signin />} />
        <Route exact path="signup" element={<Signup />} />
        <Route exact path="todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;