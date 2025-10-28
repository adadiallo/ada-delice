"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { panierService } from "../services/panierServices";
import { useUser } from "./userContext";

type CartContextType = {
  count: number;
  refreshCount: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [count, setCount] = useState(0);

  const refreshCount = async () => {
    if (!user) return;
    try {
      const totalCount = await panierService.getCountByUser();
      setCount(totalCount);
    } catch (err) {
      console.error("Erreur count panier :", err);
      setCount(0); // par défaut
    }
  };

  useEffect(() => {
    refreshCount();
  }, [user]);

  return (
    <CartContext.Provider value={{ count, refreshCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans un CartProvider");
  return context;
};
