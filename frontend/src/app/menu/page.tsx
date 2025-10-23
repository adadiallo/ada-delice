"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarEmployer from "../navbarEmployer/page";
import Footer from "../footer/page";
import { usePanier } from "../../components/context/panierContext";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

type MenuEmployer = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  type: "petit_dejeuner" | "repas";
  jour?: string;
  image?: string;
};

export default function MenuDuJour() {
  const [menus, setMenus] = useState<MenuEmployer[]>([]);
  const { ajouterAuPanier } = usePanier();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("http://localhost:3000/menu-employer");
        const data = await res.json();
        setMenus(data);
      } catch (err) {
        console.error("Erreur fetch menus:", err);
      }
    };
    fetchMenus();
  }, []);

  const typesRepas = [
    { key: "petit_dejeuner", label: "Petit-déjeuner" },
    { key: "repas", label: "Repas" },
  ];

  return (
    <>
      <NavbarEmployer />
      <div className="mt-10 min-h-screen bg-gray-100 px-6 md:px-20 py-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Menu <span className="text-[#F28C28]">Du Jour</span>
        </h2>

        {typesRepas.map(type => (
          <section key={type.key} className="mb-12">
            <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-6">{type.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menus.filter(m => m.type === type.key).map(menu => (
                <Card key={menu.id} className="overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500">
                  <div className="relative w-full h-64">
                    {menu.image ? (
                      <Image src={menu.image} alt={menu.nom} fill className="object-cover transition-transform duration-700 hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">Pas {" d'image"}</div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800 font-semibold">{menu.nom}</CardTitle>
                    <CardDescription className="text-gray-600">{menu.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-[#F28C28] mb-4">{menu.prix} FCFA</p>
                    <button
                      onClick={() => ajouterAuPanier({ id: menu.id, nom: menu.nom, prix: menu.prix, image: menu.image || "", quantity: 1 })}
                      className="w-full px-6 py-2 bg-[#F28C28] text-white rounded-lg hover:bg-[#C0392B] transition font-medium"
                    >
                      Ajouter au panier
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
}
