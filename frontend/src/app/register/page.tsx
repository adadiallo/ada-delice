"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getEntreprises, registerUser } from "../../../services/userService";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const [role, setRole] = useState<"entreprise" | "employee">("entreprise");
  const [formData, setFormData] = useState({
    nomEntreprise: "",
    nom: "",
    email: "",
    password: "",
  });
  const [entreprises, setEntreprises] = useState<{ id: number; nomEntreprise: string }[]>([]);

  // 🔹 Charger la liste des entreprises
  useEffect(() => {
    getEntreprises()
      .then(setEntreprises)
      .catch((err) => console.error("Erreur chargement entreprises:", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bodyData = {
      email: formData.email,
      password: formData.password,
      role,
      nomEntreprise: formData.nomEntreprise,
      nom: role === "employee" ? formData.nom : undefined,
    };

    try {
      await registerUser(bodyData);
      alert("Inscription réussie !");
    } catch (err) {
  const error = err as AxiosError<{ message?: string }>;
  console.error(error);
  alert("Erreur inscription : " + (error.response?.data?.message || "Une erreur est survenue"));
}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "entreprise" | "employee")
            }
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
          >
            <option value="entreprise">Entreprise</option>
            <option value="employee">Employé</option>
          </select>

          {role === "entreprise" ? (
            <input
              type="text"
              name="nomEntreprise"
              placeholder="Nom de l'entreprise"
              value={formData.nomEntreprise}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          ) : (
            <>
              <input
                type="text"
                name="nom"
                placeholder="Nom de l'employé"
                value={formData.nom}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              />
              <select
                name="nomEntreprise"
                value={formData.nomEntreprise}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                required
              >
                <option value="">-- Sélectionnez votre entreprise --</option>
                {entreprises.map((ent) => (
                  <option key={ent.id} value={ent.nomEntreprise}>
                    {ent.nomEntreprise}
                  </option>
                ))}
              </select>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#F28C28] text-white py-2 rounded-lg cursor-pointer transition"
          >
            {"            S'inscrire"}
          </button>
        </form>

        <p className="text-center mt-4">
          Vous avez un compte ?{" "}
          <Link href="/login" className="text-[#F28C28]">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}