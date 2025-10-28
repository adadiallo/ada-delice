"use client";

import { useState } from "react";
import SidebarAdmin from "../../components/sideBar/sidebarAdmin";
import AdminNavbar from "../navbarAdmin/page";
import { ProtectedRoute } from "@/components/protectedRoe";
import DashboardCard from "@/components/DashboardCard";



export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
            <ProtectedRoute allowedRoles={["admin"]}>
    
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminNavbar/>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-white text-2xl px-3 py-1 rounded hover:bg-[#F28C28]"
        >
          ☰
        </button>

      <div className="flex flex-1 pt-8">
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white text-black shadow-lg
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:static md:flex-shrink-0
          `}
        >
          <SidebarAdmin onLinkClick={() => setSidebarOpen(false)} />
        </aside>

        <main className="flex-1 p-6 ml-0 space-y-8">
          <DashboardCard />
          {children}
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
