import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
// import axiosInstance from "../hook/axiosInstance‎";
import useAxiosSecure from "../hook/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const axiosSecure = useAxiosSecure(); // ✅ call the hook
  const fetchCurrentUser = async () => {
    try {
      const response = await axiosSecure.get("/auth/me");
      console.log(response);
      setUser(response.data?.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authInfo = { loading, setLoading, user, setUser, error };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
