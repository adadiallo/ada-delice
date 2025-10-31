"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaUtensils, FaShoppingBag, FaBuilding, FaUsers, FaBars, FaTimes } from "react-icons/fa";

export default function SidebarAdmin() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { name: "Liste Menus", href: "/dashboard/listeMenuEmployer", icon: <FaUtensils /> },
    { name: "Liste Commandes", href: "/dashboard/commandes", icon: <FaShoppingBag /> },
    { name: "Liste Entreprises", href: "/dashboard/listeEntreprises", icon: <FaBuilding /> },
    { name: "Liste Employés", href: "/dashboard/employes", icon: <FaUsers /> },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-8 left-4 z-50">
        <button
          className="text-gray-800 text-3xl focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        ></div>
      )}

      
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold mt-8">Tableau de bord</h2>
          <button
            className="text-gray-600 text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2 mt-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-[#F28C28] text-white font-semibold"
                    : "text-gray-800 hover:bg-[#F28C28] hover:text-white"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
