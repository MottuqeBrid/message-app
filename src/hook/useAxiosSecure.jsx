import { useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "./axiosInstance‎";

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const publicEndpoints = ["/auth/login", "/auth/register", "/"];
    const token = localStorage.getItem("token");

    // Add Authorization header to every request
    axiosInstance.interceptors.request.use((config) => {
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    // Optionally handle unauthorized responses globally
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Clear token and redirect to login
          // localStorage.removeItem("token");
          const currentPath = window.location.pathname;
          if (!publicEndpoints.includes(currentPath)) {
            navigate("/auth/login");
          }
          // navigate("/auth/login");
        }
      },
    );
  }, [navigate]);
  return axiosInstance;
};

export default useAxiosSecure;
