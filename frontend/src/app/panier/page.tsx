"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import NavbarEmployer from "../navbarEmployer/page";

import toast from "react-hot-toast";
import { useUser } from "../../../context/userContext";
import { useCart } from "../../../context/panierContext";

type PanierItem = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image: string;
  quantite: number;
};

export default function PanierPage() {
  const { user } = useUser();
  const { refreshCount } = useCart();
  const [panier, setPanier] = useState<PanierItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // 🔹 Charger le panier depuis le backend
  useEffect(() => {
    const fetchPanier = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user) return;

      try {
        const res = await fetch("http://localhost:3000/panier", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPanier(data);
        calculerTotal(data);
      } catch (error) {
        console.error("Erreur de chargement du panier :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanier();
  }, [user]);

  // 🔹 Calcul du total
  const calculerTotal = (items: PanierItem[]) => {
    const total = items.reduce((acc, item) => acc + item.prix * item.quantite, 0);
    setTotal(total);
  };

  // 🔹 Mettre à jour la quantité (+ ou -)
  const handleUpdateQuantite = async (menuId: number, quantite: number) => {
    if (quantite <= 0) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/panier/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ menuId, quantite }),
      });

      if (res.ok) {
        const updated = panier.map((item) =>
          item.id === menuId ? { ...item, quantite } : item
        );
        setPanier(updated);
        calculerTotal(updated);
        toast.success("Quantité mise à jour !");
      }
    } catch (err) {
      console.error("Erreur update quantité :", err);
    }
  };

  // 🔹 Supprimer un produit
  const handleRemove = async (menuId: number) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/panier/remove/${menuId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const updated = panier.filter((item) => item.id !== menuId);
        setPanier(updated);
        calculerTotal(updated);
        refreshCount();
        toast.success("Produit retiré du panier !");
      }
    } catch (err) {
      console.error("Erreur suppression produit :", err);
    }
  };

  // 🔹 Valider la commande (simple version)
  const handleValiderCommande = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/commandes/valider", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Commande validée !");
        setPanier([]);
        setTotal(0);
        refreshCount();
      }
    } catch (err) {
      console.error("Erreur commande :", err);
    }
  };

  // 🔹 Affichage
  return (
    <>
      <NavbarEmployer />
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Mon Panier</h1>

        {loading ? (
          <p className="text-center text-gray-500">Chargement du panier...</p>
        ) : panier.length === 0 ? (
          <p className="text-center text-gray-500">Votre panier est vide.</p>
        ) : (
          <>
            <div className="grid gap-6">
              {panier.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center md:justify-between bg-white shadow-md rounded-lg p-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.nom}
                      width={80}
                      height={80}
                      className="rounded object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{item.nom}</h2>
                      <p className="text-gray-500">Prix unitaire : {item.prix} FCFA</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => handleUpdateQuantite(item.id, item.quantite - 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantite}</span>
                    <button
                      onClick={() => handleUpdateQuantite(item.id, item.quantite + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>

                  <div className="mt-4 md:mt-0 font-semibold text-lg">
                    {item.prix * item.quantite} FCFA
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-8 p-4 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-xl font-bold text-gray-800">
                Total : {total.toLocaleString()} FCFA
              </p>
              <button
                onClick={handleValiderCommande}
                className="mt-4 md:mt-0 px-6 py-3 bg-[#F28C28] text-white font-semibold rounded-lg hover:bg-[#d77a1f]"
              >
                Valider la commande
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
