import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../types/models";
import { getSelfData, login } from "../lib/api";
import { useLocation, useNavigate } from "react-router-dom";

type AuthContext = {
  isLoading: boolean;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
};

type AuthContextData = {
  isLoading: boolean;
  user: User | null;
  token: string | null;
};

const Auth = createContext<AuthContext>({
  isLoading: true,
  user: null,
  token: "",
  login: async () => {
    return null;
  },
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const loginHandler = async (
    username: string,
    password: string
  ): Promise<User | null> => {
    const res = await login(username, password);
    if (res.isError || res.data === null) {
      return null;
    }
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setToken(res.data.token);
    return res.data.user;
  };

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      setIsLoading(false);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        getSelfData(token).then((res) => {
          if (res.isError || !res.data) {
            logoutHandler();
          } else {
            setUser(res.data.user);
          }
        });
        setToken(token);
      } else {
        setIsLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      if (
        !user &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
        navigate("/login");
      } else if (location.pathname === "/") {
        navigate("/login");
      }
    }
  }, [user, isLoading, location, navigate]);

  const providerValue = useMemo<AuthContextData>(() => {
    const value: AuthContextData = {
      token,
      isLoading,
      user,
    };
    return value;
  }, [isLoading, user, token]);

  return (
    <Auth.Provider
      value={{
        ...providerValue,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

const useAuth = () => {
  const context = useContext(Auth);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
