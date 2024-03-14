import { createContext, useState, ReactNode } from "react";
import { authProvider, User } from "../services/authFacade";
import { useContext } from "react";
import { LoginResponse, LoginRequest } from "../services/authFacade";

interface AuthContextType {
  username: string | null;
  create: (user: User) => Promise<LoginResponse>;
  signIn: (user: User) => Promise<LoginResponse>;
  signOut: () => void;
  isLoggedIn: () => boolean;
  isLoggedInAs: (role: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: ReactNode }) {
  //We use this to distinguish between being logged in or not
  const initialUsername = localStorage.getItem("username") || null;
  const [username, setUsername] = useState<string | null>(initialUsername);

  const signIn = async (user_: LoginRequest) => {
    console.log(user_);
    return authProvider.signIn(user_).then((user) => {
      setUsername(user.username);
      localStorage.setItem("username", user.username);
      localStorage.setItem("roles", JSON.stringify(user.roles));
      localStorage.setItem("token", user.token);
      return user;
    });
  };

  const create = async (user_: User) => {
    console.log(user_);
    return authProvider.create(user_).then((user) => {
      setUsername(user.username);
      localStorage.setItem("username", user.username);
      localStorage.setItem("roles", JSON.stringify(user.roles));
      localStorage.setItem("token", user.token);
      return user;
    });
  };

  //Observe how we can sign user out without involving the backend (is that (always) good?)
  const signOut = () => {
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
  };

  function isLoggedIn() {
    return username != null;
  }

  function isLoggedInAs(role: string[]) {
    const roles: Array<string> = JSON.parse(
      localStorage.getItem("roles") || "[]"
    );
    console.log(roles);
    return roles?.some((r) => role.includes(r)) || false;
  }

  const value = { username, isLoggedIn, isLoggedInAs, signIn, signOut, create };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
