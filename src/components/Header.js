import React from "react";
import logo from "../assets/images/logo.jpg";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <span className="fa-solid fa-align-justify"></span>
        </div>
      </header>
    </>
  );
};

export default Header;
