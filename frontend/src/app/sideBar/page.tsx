"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarAdmin({ onLinkClick }: { onLinkClick: () => void }) {
  const pathname = usePathname();

  const links = [
    { name: "Liste Menus", href: "/listeMenuEmployer" },
    { name: "Liste Commandes", href: "/admin/commandes" },
    { name: "Liste Entreprises", href: "/listeEntreprises" },
        { name: "Liste Employes", href: "/employes" },

  ];

  return (
    <nav className="flex flex-col h-full p-4 mt-8 ">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`p-2 mb-2 rounded ${
              isActive ? "bg-[#F28C28] text-white font-semibold" : "text-black hover:bg-[#F28C28] hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
