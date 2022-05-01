import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddFavorite from "../components/AddFavorite";
import Details from "../components/Details";
import Favorites from "../components/Favorites";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home";

export function DashboardRouter() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/add" element={<AddFavorite />}></Route>
        <Route path="/detail/:lat,:long" element={<Details />}></Route>
        <Route path="/*" element={<Navigate to="/" />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}
