'use client';
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

export default function AdminNavbar() {
  const { user, loading, logout } = useUser();

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F28C28] text-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Ada Delice
      </Link>

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
    </nav>
  );
}
