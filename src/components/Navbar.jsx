import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/timer">Timer</Link>
        </li>
        <li>
          <Link to="/stopwatch">Stopwatch</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
