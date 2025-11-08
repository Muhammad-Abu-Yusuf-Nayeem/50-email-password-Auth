import React from "react";
import Home from "../component/Home.jsx";
import Header from "../component/Header.jsx";
import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
