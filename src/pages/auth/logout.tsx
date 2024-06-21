import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import AuthUser from "../../api/auth";
import Spinner from "../../components/spinner/spinner";

export default function LogOut() {
  const { auth, setAuth }: any = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthUser.logOut();
    setAuth("");
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
}
