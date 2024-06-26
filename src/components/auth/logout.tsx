import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import AuthUser from "../../api/auth";
import { getUser } from "../../api/users";
import Spinner from "../spinner/spinner";

export default function LogOut() {
  const { setAuth }: any = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function logout() {
      AuthUser.logOut();
      const response = await getUser();
      setAuth(response);
    }
    logout();
    setIsLoading(false);
    window.location.href = "/";
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
}
