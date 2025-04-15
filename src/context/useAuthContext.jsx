import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

const authSessionKey = "_TECHMIN_AUTH_KEY_";

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const getSession = () => {
    const storedUser = localStorage.getItem(authSessionKey);
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const [user, setUser] = useState(getSession());

  const saveSession = (session) => {
    // Expect session to have { _id, name, email, role, token }
    localStorage.setItem(authSessionKey, JSON.stringify(session));
    setUser(session);
  };

  const removeSession = () => {
    localStorage.removeItem(authSessionKey);
    setUser(null);
    navigate("/auth/login");
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin, // Function to check if user is admin
        saveSession,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
