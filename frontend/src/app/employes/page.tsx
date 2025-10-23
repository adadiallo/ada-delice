"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/page";

type User = {
  id: number;
  nom: string;
  nomEntreprise?: string;
  email: string;
  role: string;
};

export default function EntreprisesListe() {
  const [entreprises, setEntreprises] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntreprises = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/user/employes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des entreprises");

      const data: User[] = await res.json();
      setEntreprises(data);
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
    fetchEntreprises();
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <DashboardLayout>
    <div className="max-w-5xl mx-auto mt-10 p-4 text-sm">
      <h2 className="text-xl font-semibold text-[#F28C28] mb-4">
        Liste des Employes
      </h2>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden ">
        <thead className="bg-[#F28C28] text-white ">
          <tr className="">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nom employe</th>
            <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Entreprise</th>

          </tr>
        </thead>
        <tbody className="bg-white text-left">
          {entreprises.map((entreprise) => (
            <tr
              key={entreprise.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-2">{entreprise.id}</td>
              <td className="p-2">{entreprise.nom || "-"}</td>
              <td className="p-2">{entreprise.email}</td>
                            <td className="p-2">{entreprise.nomEntreprise}</td>

            </tr>
          ))}
        </tbody>
      </table>
   
    </div>
    </DashboardLayout>
  );
}
