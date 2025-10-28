'use client';
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlinePerson } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { useUser } from "../../../context/userContext";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminNavbar() {
  const { user, loading, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F28C28] text-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        Ada Delice
      </Link>

      {/* Menu desktop */}
      <div className="hidden md:flex items-center gap-4">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 bg-white text-[#0c5e69] px-3 py-1 rounded-md">
                <MdOutlinePerson size={20} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-44">
              <div className="px-4 py-2 font-medium border-b">{user.email}</div>
              <DropdownMenuItem onClick={logout} className="flex gap-2">
                <LuLogOut size={18} />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Hamburger mobile */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menu mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F28C28] flex flex-col gap-2 p-4 md:hidden">
          {user && (
            <>
              <div className="px-4 py-2 font-medium border-b">{user.email}</div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 hover:bg-[#e07b1e] rounded"
              >
                <LuLogOut size={18} />
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
