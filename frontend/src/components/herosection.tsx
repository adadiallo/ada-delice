"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    const handleScroll = () => {
      const bg = document.querySelector("#hero-bg") as HTMLElement;
      if (bg) {
        bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        id="hero-bg"
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: "url('/repas.jpg')" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 opacity-0 animate-slideInLeft">
          Livraison de repas pour entreprises et employés
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-0 animate-fadeIn delay-200">
          Gagnez du temps et profitez de menus variés et équilibrés chaque jour.
        </p>
        <div className="flex flex-wrap gap-4 opacity-0 animate-fadeIn delay-400">
          <Link
            href="/login"
            className="px-6 py-3 bg-[#F28C28] text-white rounded-lg hover:bg-white hover:text-[#F28C28] hover:border border-[#F28C28] transition-all duration-300 font-medium shadow-lg"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 border border-[#F28C28] text-[#F28C28] rounded-lg hover:bg-[#F28C28] hover:text-white transition-all duration-300 font-medium shadow-lg"
          >
            {"            S’inscrire"}{" "}
          </Link>
        </div>
      </div>
    </section>
  );
}
