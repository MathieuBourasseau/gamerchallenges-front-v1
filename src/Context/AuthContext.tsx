import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (data: { token: string; userId: string }) => void;
  logout: () => void;
  loadingAuth: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  loadingAuth: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("userId");

    if (storedToken && storedId) {
      setToken(storedToken);
      setUserId(storedId);
    }
    setLoadingAuth(false);
  }, []);

  const login = ({ token, userId }: { token: string; userId: string }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, loadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
