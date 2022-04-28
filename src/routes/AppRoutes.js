import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { DashboardRouter } from "./DashboardRoutes";
import PrivateRoters from "./PrivateRoutes";
import PublicRouters from "./PublicRoutes";

function AppRoutes() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [setIsLoggedIn, setChecking]);

  if (checking) {
    return <h1>Espere....</h1>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouters isAuth={isLoggedIn}>
              <Login />
            </PublicRouters>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRouters isAuth={isLoggedIn}>
              <Register />
            </PublicRouters>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoters isAuth={isLoggedIn}>
              <DashboardRouter />
            </PrivateRoters>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
