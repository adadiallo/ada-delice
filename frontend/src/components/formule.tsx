"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function FormulesSection() {
  const formules = [
    {
      title: "Petit Déjeuner",
      description:
        "Commencez la journée avec nos formules petit-déjeuner variées : café, jus frais, viennoiseries et sandwichs pour vos équipes.",
      image: "/petit-dej.jpg",
      link: "formules/formulePetitDej",
    },
    {
      title: "Repas du Midi",
      description:
        "Des plats équilibrés, locaux et savoureux, livrés directement à vos bureaux. Idéal pour les pauses déjeuner des employés.",
      image: "/repas-midi.jpg",
      link: "/formules/repas",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target); // pour que ça s’anime qu’une seule fois
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="formules" className="w-full py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 fade-up">
          Nos <span className="text-[#F28C28]">Formules</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 fade-up">
          Découvrez nos formules conçues pour les entreprises : petit-déjeuner
          et repas du midi, livrés avec soin et ponctualité à Dakar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {formules.map((item, index) => (
            <div
              key={index}
              className="fade-up bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col justify-between h-[250px]">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <Link
                  href={item.link}
                  className="self-start px-6 py-3 bg-[#F28C28] text-white font-semibold rounded-lg hover:bg-white hover:text-[#F28C28] hover:border border-[#F28C28] transition-all duration-300"
                >
                  Découvrir
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
