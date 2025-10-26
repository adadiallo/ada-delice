"use client";

import { useEffect, useState } from "react";

type CommandeItem = {
  id: number;
  menuNom: string;
  quantity: number;
  prix: number;
};

type Commande = {
  id: number;
  userId: string;
  total: number;
  isValidated: boolean;
  createdAt: string;
  items: CommandeItem[];
};

export default function CommandesListe() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommandes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/commande", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des commandes");

      const data: Commande[] = await res.json();
      setCommandes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 text-sm">
      <h2 className="text-xl font-semibold text-[#F28C28] mb-4">
        Liste des Commandes
      </h2>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden ">
        <thead className="bg-[#F28C28] text-white ">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Utilisateur</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Statut</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Items</th>
          </tr>
        </thead>
        <tbody className="bg-white text-left">
          {commandes.map((commande) => (
            <tr
              key={commande.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-2">{commande.id}</td>
              <td className="p-2">{commande.userId}</td>
              <td className="p-2">{commande.total} FCFA</td>
              <td className="p-2">{commande.isValidated ? "Validée" : "En attente"}</td>
              <td className="p-2">{new Date(commande.createdAt).toLocaleString()}</td>
              <td className="p-2">
                <ul className="list-disc ml-4">
                  {commande.items.map((item) => (
                    <li key={item.id}>
                      {item.menuNom} x {item.quantity} ({item.prix} FCFA)
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
