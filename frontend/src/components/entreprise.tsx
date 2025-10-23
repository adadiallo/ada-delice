"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function InscriptionEntreprise() {
  const [formData, setFormData] = useState({
    nomEntreprise: "",
    email: "",
    password: "",
  });
    const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }
      const data = await response.json();
      console.log("inscription reussie:",data)
      router.push('/')
    }catch (error){
    console.log("Erreur:",error);

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#2C2C2C]">
          Inscription Entreprise
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nomEntreprise"
            placeholder="Nom de l'entreprise"
            value={formData.nomEntreprise}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
            required
          />

          {/* Mot de passe */}
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
            required
          />

         

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-[#F28C28] text-white py-2 rounded-lg hover:bg-[#C0392B] transition"
          >
{" S'inscrire"}          </button>
        </form>
      </div>
    </div>
  );
}
