import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";

export function DashboardRouter() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        {/* <Route path="/add" element={<AddProduct></AddProduct>}></Route>
        <Route path="/edit" element={<EditProduct></EditProduct>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route> */}
        {/* <Route
          path="/description"
          element={<Description></Description>}
        ></Route> */}
        {/* <Route path="/search/:search" element={<Search></Search>}></Route> */}
        <Route path="/*" element={<Navigate to="/" />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}
