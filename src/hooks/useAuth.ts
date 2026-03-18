import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

type UserInfo = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  role: "user" | "admin";
  favouriteGame?: string | null;
  twitch?: string | null;
  youtube?: string | null;
  discord?: string | null;
  isBanned?: boolean;
};

export function useAuth() {
  const { token, login, logout, loadingAuth } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch user profile from /me
  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // send JWT
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user");

      const data = await response.json();
      setUserInfo(data); // store user profile
    } catch (error) {
      console.error("Auth error:", error);
      logout(); // invalid token → logout
    } finally {
      setLoadingUser(false);
    }
  };

  // Public method to refresh user data (used after PATCH /me)
  const refreshUser = async () => {
    if (!token) return;
    await fetchUser();
  };

  // Load user only when token is ready
  useEffect(() => {
    if (loadingAuth) return; // wait for AuthContext to load token

    if (token) {
      fetchUser();
    } else {
      setUserInfo(null);
      setLoadingUser(false);
    }
  }, [token, loadingAuth]);

  return { token, login, logout, userInfo, loadingUser, refreshUser };
}
