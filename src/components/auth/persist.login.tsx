import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getUser } from "../../api/users";
import Spinner from "../spinner/spinner";
import { useEffect } from "react";

export default function PersistLogin() {
  const { setAuth }: any = useAuth();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  useEffect(() => {
    setAuth(user);
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  return <Outlet />;
}
