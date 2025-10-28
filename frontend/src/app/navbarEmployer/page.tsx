"use client";

import { LuLogOut, LuShoppingCart } from "react-icons/lu";
import { MdOutlinePerson } from "react-icons/md";
import { useUser } from "../../../context/userContext";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "../../../context/panierContext";
import { useEffect, useState } from "react";

export default function NavbarEmployer() {
  const { user, loading, logout } = useUser();
  const { count, refreshCount } = useCart();
  const [mounted, setMounted] = useState(false);

  // ✅ Empêche le rendu côté serveur (hydration fix)
  useEffect(() => {
    setMounted(true);
    refreshCount(); // Rafraîchit le panier dès le chargement
  }, []);

  if (!mounted || loading) return null; // évite les erreurs SSR

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            priority
            aria-label="Logo de l'entreprise"
          />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* 🛒 Icône Panier */}
        <Link href="/panier" className="relative flex items-center text-[#0c5e69]">
          <LuShoppingCart size={24} />
          {count >= 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>

        {/* 👤 Menu utilisateur */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 bg-white text-[#0c5e69] px-3 py-1 rounded-md"
                aria-label="Menu utilisateur"
              >
                <MdOutlinePerson size={20} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-44">
              <div className="px-4 py-2 font-medium border-b text-sm truncate">
                {user.email}
              </div>
              <DropdownMenuItem
                onClick={logout}
                className="flex gap-2 items-center cursor-pointer"
              >
                <LuLogOut size={18} />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className="text-[#0c5e69] font-medium hover:underline"
          >
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}
