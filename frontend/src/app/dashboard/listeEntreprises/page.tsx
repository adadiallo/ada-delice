"use client";

import { ProtectedRoute } from "@/components/protectedRoe";
import { useEffect, useState } from "react";
import { getEntreprises } from "../../../../services/userService";

type User = {
  id: number;
  nom: string;
  nomEntreprise?: string;
  email: string;
  role: string;
};

export default function EntreprisesListe() {
  const [entreprises, setEntreprises] = useState<User[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchEntreprises();
  }, []);
const fetchEntreprises = async () => {
    try {
      const data = await getEntreprises();
      setEntreprises(data);
    } catch (error) {
      console.error("Erreur fetch:", error);
            setError("Impossible de charger les entreprises");

    }
  };



  // if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
        <ProtectedRoute allowedRoles={["admin"]}>

    <div className="max-w-5xl mx-auto mt-10 p-4 text-sm">
      <h2 className="text-xl font-semibold text-[#F28C28] mb-4">
        Liste des entreprises
      </h2>

       <table className="w-full border border-gray-200">
          <thead className="bg-[#F28C28] text-white text-left">
          <tr className="">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nom entreprise</th>
            <th className="p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white text-left">
          {entreprises.map((entreprise) => (
            <tr
              key={entreprise.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-2">{entreprise.id}</td>
              <td className="p-2">{entreprise.nomEntreprise || "-"}</td>
              <td className="p-2">{entreprise.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </ProtectedRoute>
  );
}
