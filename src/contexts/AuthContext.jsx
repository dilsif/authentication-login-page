import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import {
  registerUser,
  loginUser,
  getUser,
  checkUsername
} from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user
  const fetchCurrentUser = async () => {
    const id =
      localStorage.getItem("userId") ||
      sessionStorage.getItem("userId");

    if (!id) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await getUser(id);
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("userId");
      sessionStorage.removeItem("userId");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Login
  const login = async (credentials, rememberMe = true) => {

    const users = await loginUser(credentials.email);

    const foundUser = users.find(
      (item) => item.password === credentials.password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    if (rememberMe) {
      localStorage.setItem("userId", foundUser.id);
      sessionStorage.removeItem("userId");
    } else {
      sessionStorage.setItem("userId", foundUser.id);
      localStorage.removeItem("userId");
    }

    setUser(foundUser);

    return foundUser;
  };

  // Register
  const register = async (userData) => {

    const usernameExists = await checkUsername(
      userData.username
    );

    if (usernameExists) {
      throw new Error("Username already exists");
    }

    const users = await loginUser(userData.email);

    if (users.length > 0) {
      throw new Error("Email already registered");
    }

    const response = await registerUser({
      ...userData,
      avatar: "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(userData.fullName),
      createdAt: new Date().toISOString()
    });

    const newUser = response.data;

    localStorage.setItem("userId", newUser.id);

    setUser(newUser);

    return newUser;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    setUser(null);
  };

  // Check authentication
  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        fetchCurrentUser,
        checkUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};