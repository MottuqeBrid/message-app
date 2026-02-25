import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "./axiosInstance‎";

const AUTH_USER_QUERY_KEY = ["auth-user"];

const fetchCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response?.data?.data ?? response?.data?.user ?? response?.data ?? null;
};

const useAuth = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery(AUTH_USER_QUERY_KEY, fetchCurrentUser, {
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation(
    async (credentials) => {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AUTH_USER_QUERY_KEY);
      },
    },
  );

  const registerMutation = useMutation(
    async (payload) => {
      const response = await axiosInstance.post("/auth/register", payload);
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(AUTH_USER_QUERY_KEY);
      },
    },
  );

  const logoutMutation = useMutation(
    async () => {
      const response = await axiosInstance.post("/auth/logout");
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.setQueryData(AUTH_USER_QUERY_KEY, null);
      },
    },
  );

  return {
    user: userQuery.data ?? null,
    isAuthenticated: Boolean(userQuery.data),
    isLoadingUser: userQuery.isLoading,
    userError: userQuery.error,
    refetchUser: userQuery.refetch,

    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isLoading,
    loginError: loginMutation.error,

    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isLoading,
    registerError: registerMutation.error,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isLoading,
    logoutError: logoutMutation.error,
  };
};

export default useAuth;
