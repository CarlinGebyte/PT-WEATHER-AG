import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAsync } from "../redux/actions/actionLogin";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate("/login");
  };
  return (
    <header className="min-h-min py-4 bg-[#333] text-white">
      <nav>
        <ul className="flex justify-around sm:flex-col sm:items-center">
          <li className="sm:mb-4">
            <Link
              to="/"
              className="border-solid border-white border-2 rounded p-1"
            >
              <i className="fas -tracking-tight">Try Weather</i>
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/add">Add Favorite</Link>
          </li>
          <li>
            <p className="hover: cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
