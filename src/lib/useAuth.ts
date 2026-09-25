import { useState, useEffect, useCallback } from "react";
import { apiClient } from "./api";
import { setAccessToken, clearAccessToken } from "./authStore";

export interface UserMe {
  authenticated: boolean;
  accessToken?: string;
  tokenType?: string;
  email?: string;
  role?: string;
  clientUuid?: string;
  clientId?: string;
  siteIds?: number[];
  profile?: string;
}

export function useAuth() {
  const [user, setUser] = useState<UserMe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<UserMe>("/wjlapi/api/v1/auth/me");
      if (response.data && response.data.authenticated) {
        if (response.data.accessToken) setAccessToken(response.data.accessToken);
        setUser(response.data);
      } else {
        clearAccessToken();
        setUser(null);
      }
    } catch (err: any) {
      clearAccessToken();
      setUser(null);
      setError(err?.response?.data?.message || "Unauthorized");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (loginUrl: string = "/vconnect/login.jsp") => {
    try {
      await apiClient.post("/wjlapi/api/v1/auth/logout");
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      clearAccessToken();
      setUser(null);
      window.location.href = loginUrl;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { user, isAuthenticated: !!user?.authenticated, isLoading, error, refreshAuth: checkAuth, logout };
}
