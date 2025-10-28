"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../../../context/userContext"; // Assurez-vous que le nom du hook est correct
import { loginUser } from "../../../services/userService";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();
  const router = useRouter();

  // 🔹 Mise à jour des champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Réinitialise l'erreur lorsqu'un champ est modifié
    setError(null); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser( formData);
      console.log("donnees recues",data);

      localStorage.setItem("token", data.access_token);

      setUser({
        userId: data.user.id,
        email: data.user.email,
        role: data.user.role,
      });


      if (data.user.role === "admin") {
        router.push("/dashboard/listeMenuEmployer");
      } else if (data.user.role === "entreprise") {
        router.push("/");
      } else {
        router.push("/menu");
      }
            toast.success("Connexion réussie !");

    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Identifiants invalides ou serveur inaccessible.";
        setError(message); 
        
       
      } else {
        setError("Une erreur inconnue s'est produite.");
        toast.error("Une erreur inconnue s'est produite");
      }
    }
  };

  // 🔹 Affichage du formulaire
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && (
            <p className="text-red-600 text-sm font-medium pt-2">
              {error}
            </p>
          )}
          
          <button
            type="submit"
            className="w-full bg-[#F28C28] text-white py-2 rounded-lg cursor-pointer transition hover:bg-[#d6791e]"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center">
          Vous {" n'avez"} pas de compte ?{" "}
          <Link href="/register" className="text-[#F28C28]">
            {"S'inscrire"}
          </Link>
        </p>
      </div>
    </div>
  );
}