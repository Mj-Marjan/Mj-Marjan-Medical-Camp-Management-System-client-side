// src/hooks/useRole.js
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email && !loading) {
      axios.get(`https://medical-camp-server-liart.vercel.app/users/${user.email}`)
        .then(res => {
          setRole(res.data?.role || "");
          setIsLoading(false);
        });
    }
  }, [user, loading]);

  return [role, isLoading];
};

export default useRole;
