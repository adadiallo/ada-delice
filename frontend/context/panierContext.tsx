"use client";


import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type CartContextType = {
  count: number;
  setCount: (value: number) => void;
  refreshCount: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const refreshCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/panier/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
      }
    } catch (err) {
      console.error("Erreur panier :", err);
    }
  };

  useEffect(() => {
    refreshCount();
  }, []);

  return (
    <CartContext.Provider value={{ count, setCount, refreshCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
};
