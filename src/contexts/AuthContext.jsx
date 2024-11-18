import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { useAlert } from "./AlertContext";
import { url } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext";

// Create an AuthContext
const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  // const [cart, setCart] = useState([]);
  const { setNotificationType, setNotificationText } = useAlert();
  const storedUser = localStorage.getItem("user");
  const jsonUser = JSON.parse(storedUser);

  // Load user from localStorage if exists
  useEffect(() => {
    if (!user && storedUser) {
      setUser(jsonUser[0]);
      setAuth(true);
      // setCart(jsonUser[0].cart);
    } 
  }, [jsonUser, storedUser, user]);

  // Login function
  const login = async (username, password) => {
    try {
      // Request JWT tokens (access and refresh)
      const res = await axios.post(
        `${url}/token/`,

        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store tokens
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      // Fetch user info with the access token
      const userResponse = await axios.get(`${url}/userProfiles/`, {
        headers: {
          Authorization: `Bearer ${res.data.access}`,
          "Content-Type": "application/json",
        },
      });

      // Store user data
      console.log(userResponse.data)
      setUser(userResponse.data[0]);
      // setCart(userResponse.data[0].cart);
      setNotificationType("alert");
      setNotificationText(`Welcome Back ${userResponse.data[0].username}`);
      localStorage.setItem("user", JSON.stringify(userResponse.data));

      // Set authenticated state to true
      setAuth(true);
      console.log(auth);
      // console.log(cart);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout function
  const logout = () => {
    // Clear tokens and user data from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    // Reset state
    // setCart([]);
    setUser(null);
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
