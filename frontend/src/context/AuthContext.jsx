import { createContext, useContext, useState, useEffect } from "react";
import axiosBase from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosBase.get("/user/checkUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Guard against undefined response data
      if (response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      setIsLoading(false);
    }
  };

  const login = async (loginData) => {
    try {
      const data = await loginUser(loginData);
      console.log("Data from Backend:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      const userObj = {
        username: data.username,
        userid: data.userid || "authenticated",
      };

      setUser(userObj);

      return data;
    } catch (error) {
      console.error("Login function error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    // We pass setUser only if necessary, but keep it for flexibility
    <AuthContext.Provider value={{ user, login, setUser, logout, isLoading }}>
      {/* This !isLoading && children is great because it prevents App.js 
         from rendering routes before the first check completes 
      */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
