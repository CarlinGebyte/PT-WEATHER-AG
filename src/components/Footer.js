import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="h-44 bg-[#343434] text-white py-4 mt-4 relative w-full bottom-0 lg:h-fit">
      <ul className="flex justify-center items-center lg:flex-col lg:text-center">
        <li className="w-1/5 text-2xl lg:w-full">
          <Link to="/">
            <i className="fas -tracking-tight cursor-pointers">Try Wheater</i>
          </Link>
        </li>
        <li>
          <ul className="font-light">
            <li>
              <Link to={"#"}>Terms of Service</Link>
            </li>
            <li>
              <Link to={"#"}>Attribution</Link>
            </li>
            <li>
              <Link to={"#"}>Blog</Link>
            </li>
            <li>
              <Link to={"#"}>Help</Link>
            </li>
            <li>
              <Link to={"#"}>Contact</Link>
            </li>
            <li>
              <Link to={"#"}>Privacy</Link>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
