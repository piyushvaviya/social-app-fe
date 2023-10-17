import localStorageService from "@services/localstorage";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Add any other state variables you need, such as the user object, loading state, etc.

  useEffect(() => {
    const token = localStorageService.getLocalStorage(
      localStorageService.ACCESS_TOKEN
    );
    console.log("🚀 ~ file: useAuth.jsx:12 ~ useEffect ~ token:", token);

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Define any authentication-related functions you need, such as login, logout, etc.

  return {
    isAuthenticated,
    // Return any other values or functions you want to expose to the components using the hook.
  };
};

export default useAuth;
