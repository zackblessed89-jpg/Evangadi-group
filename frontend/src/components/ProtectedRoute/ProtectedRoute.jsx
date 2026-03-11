import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  // If auth is undefined, the Provider isn't wrapping this component correctly
  if (!auth) {
    console.error("AuthContext is missing!");
    return <Navigate to="/login" />;
  }

  const { user, isLoading } = auth;

  if (isLoading) return <Loader />;

  // If user is null OR undefined, they aren't logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
