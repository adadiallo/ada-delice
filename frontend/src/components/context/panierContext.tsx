"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUser } from "./userContext";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotal(panier.reduce((sum, item) => sum + item.prix * item.quantity, 0));
  }, [panier]);

  const ajouterAuPanier = (item: Menu) => {
    setPanier(prev => {
      const exist = prev.find(i => i.id === item.id);
      if (exist) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const retirerDuPanier = (id: number) => setPanier(prev => prev.filter(i => i.id !== id));
  const incrementer = (id: number) => setPanier(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  const decrementer = (id: number) => setPanier(prev => prev.map(i => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));

  const validerCommande = async () => {
    if (!user) return toast.error("Veuillez vous connecter pour valider votre commande");
    if (panier.length === 0) return toast.error("Votre panier est vide");

    const userId = Number(user.userId);
    if (isNaN(userId)) return toast.error("Utilisateur non trouvé");

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/commande/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: panier.map(item => ({ menuId: Number(item.id), quantity: Number(item.quantity) })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) return toast.error(data.message || "Erreur lors de la validation");

      toast.success("Commande validée avec succès !");
      setPanier([]);
    } catch (err) {
      console.error("Erreur commande:", err);
      toast.error("Erreur de validation de la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PanierContext.Provider value={{ panier, total, loading, ajouterAuPanier, retirerDuPanier, incrementer, decrementer, validerCommande }}>
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => {
  const context = useContext(PanierContext);
  if (!context) throw new Error("usePanier doit être utilisé à l'intérieur du PanierProvider");
  return context;
};
