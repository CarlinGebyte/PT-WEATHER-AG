import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAsync } from "../redux/actions/actionLongin";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate("/login");
  };
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Favorite</Link>
          </li>
          <li>
            <Link to="/edit">Edit Favorite</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <p className="hover: cursor-pointer" onClick={handleLogout}>Logout</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
