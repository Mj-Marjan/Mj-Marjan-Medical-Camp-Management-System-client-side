import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// import "../Style/animatedGradient.css"; // CSS file import

const MainLayouts = () => {
  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen flex flex-col text-white">
      <Navbar />
      <div className="flex-1 my-20 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
