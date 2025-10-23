"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SectionConfiance() {
  const entreprises = [
    { id: 1, nom: "Entreprise 1", logo: "/xarala.png" },
    { id: 1, nom: "Entreprise 1", logo: "/volkeno.png" },
    { id: 1, nom: "Entreprise 1", logo: "/gomycode.png" },
    { id: 1, nom: "Entreprise 1", logo: "/orange.png" },

  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-white overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#2C2C2C] relative inline-block">
          Elles nous font confiance
          <span className="absolute left-1/2 -bottom-3 w-20 h-1 bg-[#F28C28] -translate-x-1/2 rounded-full"></span>
        </h2>
        <p className="text-gray-600 mt-6 text-lg">
          Plus de 50 entreprises et startups choisissent <span className="text-[#F28C28] font-medium">Ada Delices</span> chaque jour.
        </p>
      </div>

      <motion.div
        className="flex gap-10 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...entreprises, ...entreprises].map((e, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-40   transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <Image
              src={e.logo}
              alt={e.nom}
              width={150}
              height={80}
              className="object-contain mx-auto"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

