"use client";
import { useEffect, useState } from "react";
import { getCommandes, updateCommandeStatut } from "../../../../services/commandeServices";

type Menu = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  type: "petit_dejeuner" | "repas";
  image?: string;
};

type CommandeItem = {
  id: number;
  quantite: number;
  menu: Menu;
};

type User = {
  id: number;
  email: string;
  nom: string;
};

type Commande = {
  id: number;
  user: User;
  total: number;
  statut: "en attente" | "validée" | "livrée";
  items: CommandeItem[];
  createdAt: string;
};

export default function CommandesListe() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Charger les commandes
  const fetchCommandes = async () => {
    try {
      // setLoading(true);
      const data = await getCommandes();
      setCommandes(data);
    } catch (err) {
      setError("Erreur lors du chargement des commandes");
      console.error(err);
    } 
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  // ✅ Changer le statut
  const changerStatut = async (id: number, statut: Commande["statut"]) => {
    try {
      const updated = await updateCommandeStatut(id, statut);
      setCommandes((prev) =>
        prev.map((cmd) => (cmd.id === id ? { ...cmd, statut: updated.statut } : cmd))
      );
    } catch (err) {
      console.error("Erreur lors du changement de statut", err);
    }
  };

  const getBadgeColor = (statut: Commande["statut"]) => {
    switch (statut) {
      case "en attente":
        return "bg-orange-400 text-white";
      case "validée":
        return "bg-green-500 text-white";
      case "livrée":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  // if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold text-[#F28C28] mb-6">Liste des Commandes</h2>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[#F28C28] text-white">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Utilisateur</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Statut</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Plats</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-left">
          {commandes.map((commande) => (
            <tr
              key={commande.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-2">{commande.id}</td>
              <td className="p-2">{commande.user.nom || commande.user.email}</td>
              <td className="p-2">{commande.total} FCFA</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getBadgeColor(
                    commande.statut
                  )}`}
                >
                  {commande.statut}
                </span>
              </td>
              <td className="p-2">
                {new Date(commande.createdAt).toLocaleString()}
              </td>
              <td className="p-2">
                <ul className="list-disc ml-4">
                  {commande.items.map((item) => (
                    <li key={item.id}>
                      {item.menu.nom} x {item.quantite} ({item.menu.prix} FCFA)
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-2 flex gap-2">
                {commande.statut === "en attente" && (
                  <button
                    onClick={() => changerStatut(commande.id, "validée")}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Valider
                  </button>
                )}
                {commande.statut === "validée" && (
                  <button
                    onClick={() => changerStatut(commande.id, "livrée")}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Livrer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
