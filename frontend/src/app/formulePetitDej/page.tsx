"use client";
import Image from "next/image";
import Link from "next/link";


export default function PetitDejeunerPage() {
  const menus = [
    {
      name: "Café complet",
      image: "/cafe.jpg",
    },
    {
      name: "Sandwich omelette",
      image: "/sandwich.jpg",
    },
    {
      name: "Pain Omelette",
      image: "/omelette.jpg",
    },
    {
      name: "Petit déj sénégalais",
      image: "/menus/petit-dej-senegalais.jpg",
    },
  ];

  return (
    <>
    <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Titre */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center">
          Nos <span className="text-[#F28C28]">Menus Petit Déjeuner</span>
        </h1>
        <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12">
          Découvrez nos différentes formules de petit-déjeuner livrées
          directement à vos bureaux : savoureuses, variées et prêtes à déguster.
        </p>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative w-full h-60">
                <Image
                  src={menu.image}
                  alt={menu.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {menu.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton retour */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-[#F28C28] text-white font-semibold rounded-lg hover:bg-white hover:text-[#F28C28] hover:border border-[#F28C28] transition-all duration-300"
          >
            ← Retour aux formules
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
