"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import NavbarEmployer from "../navbarEmployer/page";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import { useCart } from "../../../context/panierContext";
import { useUser } from "../../../context/userContext";
import Footer from "@/components/footer";
import api from "../../../utils/api";
import { AxiosError } from "axios";

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
  const { refreshCount } = useCart();
  const { user } = useUser();

  const fetchMenus = async () => {
    try {
      const res = await api.get<MenuEmployer[]>("/menu-employer");
      setMenus(res.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Erreur lors du chargement des menus");
      } else {
        toast.error("Erreur inconnue lors du chargement des menus");
      }
      console.error("Erreur fetch menus:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const addToPanier = async (menuId: number, quantite: number = 1) => {
    try {
      await api.post("/panier/add", { menuId, quantite });
      toast.success("menu ajouté au panier !");
      refreshCount();
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message || "Erreur lors de l’ajout au panier";
        toast.error(message);
      } else {
        toast.error("Erreur inconnue lors de l’ajout au panier");
      }
      console.error("Erreur add panier:", err);
    }
  };

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

        {typesRepas.map((type) => (
          <section key={type.key} className="mb-12">
            <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-6">
              {type.label}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menus
                .filter((menu) => menu.type === type.key)
                .map((menu) => (
                  <Card
                    key={menu.id}
                    className="overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
                  >
                    <div className="relative w-full h-64">
                      {menu.image ? (
                        <Image
                          src={menu.image}
                          alt={menu.nom}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                          Pas {"d'image"}
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl text-gray-800 font-semibold">
                        {menu.nom}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {menu.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="font-bold text-[#F28C28] mb-4">
                        {menu.prix} FCFA
                      </p>
                      <button
                        onClick={() => addToPanier(menu.id, 1)}
                        className="w-full px-6 py-2 bg-[#F28C28] text-white rounded-lg transition font-medium cursor-pointer"
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
