import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getUser } from "../../api/users";
import Spinner from "../spinner/spinner";
import { useEffect, useState } from "react";
import AuthUser from "../../api/auth";

export default function PersistLogin() {
  const { auth, setAuth }: any = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await getUser();
        if (response.status === 500) {
          AuthUser.logOut();
          const response = await getUser();
          setAuth(response);
        } else {
          setAuth(response);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    !auth.user ? verifyUser() : setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <Outlet />;
}
