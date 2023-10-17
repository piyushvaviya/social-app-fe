import { Navigate, useNavigate } from "react-router-dom";
import Layout from "@components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import authService from "@services/auth";
import { setToken, setUser } from "@/redux/reducers/authDataSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state?.authData?.authToken);

  const checkAuth = async () => {
    if (authToken) {
      const authRes = await authService.checkAuth();

      if (authRes?.success) {
        console.log("user is valid");
        return;
      }

      dispatch(setUser(null));
      dispatch(setToken(""));
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return authToken ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

export default ProtectedRoute;
