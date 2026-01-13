import axiosBase from "../../services/axiosConfig";
import axios from "axios";

export const loginUser = async (loginData) => {
  try {
    const response = await axiosBase.post("/user/login", loginData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.msg || "Login failed. Please try again.";
    throw new Error(message);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axiosBase.post("/user/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Could not process request.");
  }
};

export const resetPassword = async (token, newPassword) => {
  const response = await axiosBase.post(`/user/reset-password/${token}`, {
    password: newPassword,
  });
  return response.data;
};
export const changePassword = async (passwords) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosBase.post("/user/change-password", passwords, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Failed to update password.");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosBase.post("/user/register", userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Registration failed.";
    throw new Error(message);
  }
};

export const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axiosBase.get("/user/checkUser", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Ensure we don't return undefined if the response is empty (304)
    return response.data || { token };
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
