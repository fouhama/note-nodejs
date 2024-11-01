/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  const loginUser = async (userData) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      setUser(data.token);
      toast.success("Login Successful");
    }
    if (!data.success) {
      toast.error(data.message);
    }
  };
  const registerUser = async (userData) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      setUser(data.token);
      toast.success("Registered Successfully");
    }
    if (!data.success) {
      toast.error(data.message);
    }
  };
  const logoutUser = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
