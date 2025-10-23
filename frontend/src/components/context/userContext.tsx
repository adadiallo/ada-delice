"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  userId: number;
  email: string;
  role: string;
} | null;

type UserContextType = {
  user: User;
  loading: boolean;
  logout: () => void;
  setUserContext: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  logout: () => {},
  setUserContext: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const setUserContext = (user: User) => setUser(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("token");
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser({
          userId: data.id,
          email: data.email,
          role: data.role,
        });
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <UserContext.Provider value={{ user, loading, logout, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
