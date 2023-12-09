import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Home } from "./components/Home/Home";
import toast, { Toaster } from "react-hot-toast";
import { loadUser } from "./redux/actions/user";
import { ProtectedRoute } from "protected-route-react";
import { Profile } from "./components/Profile/Profile";
import BasicDetails from "./components/BasicDetails/BasicDetails";
import Dashborad from "./components/Dashboard/Dashborad";

function App() {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basicdetails" element={<BasicDetails />} />
        <Route path="/admin/dashboard" element={<Dashborad />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes  */}
        <Route
          path="/login"
          element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/basicdetails"
            >
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/basicdetails"
            >
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
