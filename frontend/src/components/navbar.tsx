"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (pathname !== "/formules") return;

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } 
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <div className="bg-[#F28C28] text-white text-sm md:text-base py-3 px-4 md:px-20 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaPhoneAlt size={16} />
          <span>+221 78 145 26 67</span>
        </div>

        <div className="hidden md:block animate-soft-pulse text-center">
          Déjà plus de{" "}
          <span className="text-[#2C2C2C] font-semibold">15 000</span> repas livrés aux entreprises de Dakar !
        </div>
      </div>

      <nav className="sticky top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-20 flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={130}
                height={130}
                aria-label="Logo de l'entreprise"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/" pathname={pathname} activeSection={activeSection}>Accueil</NavLink>
            <NavLink href="#" pathname={pathname} activeSection={activeSection}>Formules</NavLink>
            <NavLink href="/menu" pathname={pathname} activeSection={activeSection}>Menus</NavLink>
            <NavLink href="#" pathname={pathname} activeSection={activeSection}>Partenaires</NavLink>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3">
            <MobileLink href="/" pathname={pathname} setIsOpen={setIsOpen}>Accueil</MobileLink>
            <MobileLink href="/formule" pathname={pathname} setIsOpen={setIsOpen}>Formules</MobileLink>
            <MobileLink href="/menu" pathname={pathname} setIsOpen={setIsOpen}>Menus</MobileLink>
            <MobileLink href="/clients" pathname={pathname} setIsOpen={setIsOpen}>Nos Clients</MobileLink>
          </div>
        )}
      </nav>

      <style jsx global>{`
        @keyframes softPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-soft-pulse {
          animation: softPulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

function NavLink({
  href,
  pathname,
  activeSection,
  children,
}: {
  href: string;
  pathname: string;
  activeSection: string;
  children: React.ReactNode;
}) {
  const isActive =
    pathname === href || (pathname === "/formules" && activeSection === "formules");

  return (
    <Link
      href={href}
      className={`text-gray-700 hover:text-[#F28C28] pb-1 transition-all duration-300 ${
        isActive ? "border-b-2 border-[#F28C28]" : ""
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  pathname,
  setIsOpen,
  children,
}: {
  href: string;
  pathname: string;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className={`block text-gray-700 text-lg hover:text-[#F28C28] transition-all duration-300 ${
        pathname === href ? "text-[#F28C28] font-semibold" : ""
      }`}
    >
      {children}
    </Link>
  );
}
