// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/campaigns">Campaigns</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link> {/* Add this link for Signup */}
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
