import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1. Create context
const UserContext = createContext();

// 2. Create Provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response);

          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.error) {
          setUser(null);
          // } else {
          //   setError("Server error");
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook to use the context
export const useAuth = () => useContext(UserContext);

// 4. Export the Provider
export default AuthProvider;
