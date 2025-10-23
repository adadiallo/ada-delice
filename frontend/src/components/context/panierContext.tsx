"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUser } from "./userContext"; // ton UserContext
import toast from "react-hot-toast";

type Menu = {
  id: number;
  nom: string;
  prix: number;
  image: string;
  quantity: number;
};

type PanierContextType = {
  panier: Menu[];
  total: number;
  loading: boolean;
  ajouterAuPanier: (item: Menu) => void;
  retirerDuPanier: (id: number) => void;
  incrementer: (id: number) => void;
  decrementer: (id: number) => void;
  validerCommande: () => void;
};

const PanierContext = createContext<PanierContextType | undefined>(undefined);

export const PanierProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [panier, setPanier] = useState<Menu[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔄 Charger le panier du backend
  useEffect(() => {
    if (!user) {
      setPanier([]);
      setLoading(false);
      return;
    }

    const chargerPanier = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/panier/${user.userId}`);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const currentPanier = data[0];
          const items = currentPanier.items.map(
            (item: { menu: { id: number; nom: string; prix: number; image: string }; quantity: number }) => ({
              id: item.menu.id,
              nom: item.menu.nom,
              prix: item.menu.prix,
              image: item.menu.image,
              quantity: item.quantity,
            })
          );
          setPanier(items);
        } else {
          setPanier([]);
        }
      } catch (err) {
        console.error("Erreur chargement panier:", err);
        setPanier([]);
      } finally {
        setLoading(false);
      }
    };

    chargerPanier();
  }, [user]);

  // 🔢 Calcul total
  useEffect(() => {
    const totalPrix = panier.reduce((sum, item) => sum + item.prix * item.quantity, 0);
    setTotal(totalPrix);
  }, [panier]);

  // ➕ Ajouter un produit
  const ajouterAuPanier = (item: Menu) => {
    setPanier((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ➖ Retirer un produit
  const retirerDuPanier = (id: number) => {
    setPanier((prev) => prev.filter((i) => i.id !== id));
  };

  // 🔺 Incrémenter quantité
  const incrementer = (id: number) => {
    setPanier((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  // 🔻 Décrémenter quantité
  const decrementer = (id: number) => {
    setPanier((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };

  // 🧾 Valider commande
  const validerCommande = async () => {
    if (!user) return toast.error("Veuillez vous connecter pour valider votre commande");
    if (panier.length === 0) return toast.error("Votre panier est vide");

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/commande/${user.userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return toast.error(data.message || "Erreur lors de la validation");
      }

      toast.success("Commande validée avec succès !");
      setPanier([]); // vider le panier après validation
    } catch (err) {
      console.error("Erreur commande:", err);
      toast.error("Erreur de validation de la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PanierContext.Provider
      value={{
        panier,
        total,
        loading,
        ajouterAuPanier,
        retirerDuPanier,
        incrementer,
        decrementer,
        validerCommande,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => {
  const context = useContext(PanierContext);
  if (!context) throw new Error("usePanier doit être utilisé à l'intérieur du PanierProvider");
  return context;
};
