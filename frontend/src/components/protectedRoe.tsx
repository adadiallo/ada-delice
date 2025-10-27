"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        toast.error("Vous n'avez pas la permission !");
        router.push("/"); 
      } else {
        setAuthorized(true); // utilisateur autorisé
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!authorized) {
    // écran vide ou spinner pendant la redirection
    return null;
  }

  return <>{children}</>;
};
