import React from "react";
import "./header.component.jsx";

const Header = (props) => {
  return (
    <div>
      <h1>Welcome to the Sagun's ChatRoom {props.SignOut}</h1>
    </div>
  );
};

export default Header;
