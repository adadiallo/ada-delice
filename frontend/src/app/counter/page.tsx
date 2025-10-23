"use client";

import { useEffect, useState } from "react";
import { FiShoppingCart, FiUsers, FiBox } from "react-icons/fi";

export default function DashboardCards() {
  const [totals, setTotals] = useState({
    entreprises: 0,
    commandes: 0,
    employes: 0,
  });

  useEffect(() => {
    fetchTotals();
  }, []);

  const fetchTotals = async () => {
    try {
      const [entrepriseRes, commandesRes, employesRes] = await Promise.all([
        fetch("http://localhost:3000/user/entreprises"),
        fetch("https://e-commerce-6-uf80.onrender.com/commandes"),
        fetch("http://localhost:3000/user/employes"),
      ]);

      const entreprises = await entrepriseRes.json();
      const commandes = await commandesRes.json();
      const employes = await employesRes.json();

      setTotals({
        employes: employes.length,
        commandes: commandes.length,
        entreprises: entreprises.length,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des totaux:", err);
    }
  };

  const cards = [
    {
      title: "Entreprises",
      value: totals.entreprises,
      icon: <FiBox size={24} className="text-[#F28C28]" />,
    },
    {
      title: "Employés",
      value: totals.employes,
      icon: <FiUsers size={24} className="text-[#F28C28]" />,
    },
    {
      title: "Commandes",
      value: totals.commandes,
      icon: <FiShoppingCart size={24} className="text-[#F28C28]" />,
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex items-center p-5 rounded-lg shadow-sm bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300"
        >
          <div className="p-3 bg-black rounded-full mr-4">
            {card.icon}
          </div>
          <div>
            <h3 className="text-gray-700 text-sm font-medium">{card.title}</h3>
            <p className="text-[#F28C28] text-2xl font-bold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
