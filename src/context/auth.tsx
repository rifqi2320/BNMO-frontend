import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../types/models";
import { getSelfData, login } from "../lib/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

type AuthContext = {
  isLoading: boolean;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  revalidateUser: () => Promise<void>;
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
  revalidateUser: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const loginHandler = async (
    username: string,
    password: string
  ): Promise<User | null> => {
    const res = await login(username, password);
    if (res.isError || res.data === null) {
      return null;
    }
    if (res.data.user.isVerified === false) {
      toast({
        title: "Error",
        description: "User is not yet verified",
        status: "error",
      });
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

  const revalidate = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      getSelfData(token)
        .then((res) => {
          if (res && res.data) {
            setUser(res.data.userData);
            if (
              res.data.userData.role === "ADMIN" &&
              !location.pathname.includes("admin")
            ) {
              navigate("/admin");
            } else if (
              res.data.userData.role === "USER" &&
              !location.pathname.includes("user")
            ) {
              navigate("/user");
            }
          }
        })
        .catch((err) => {
          logoutHandler();
        });
      setToken(token);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      setIsLoading(false);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        getSelfData(token)
          .then((res) => {
            if (res && res.data) {
              setUser(res.data.userData);
              if (
                res.data.userData.role === "ADMIN" &&
                !location.pathname.includes("admin")
              ) {
                navigate("/admin");
              } else if (
                res.data.userData.role === "USER" &&
                !location.pathname.includes("user")
              ) {
                navigate("/user");
              }
            }
          })
          .catch((err) => {
            logoutHandler();
          });
        setToken(token);
      } else {
        setIsLoading(false);
      }
    }
  }, [user, navigate, location.pathname]);

  useEffect(() => {
    if (!isLoading) {
      if (
        !user &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
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
        revalidateUser: revalidate,
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
