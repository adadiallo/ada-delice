"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../../../context/userContext";
import { loginUser } from "../../../services/userService";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useUser();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ Appel du service
      const data = await loginUser(formData);
console.log("donnees",data)
      // ✅ Stocker le token JWT
      localStorage.setItem("token", data.access_token);

      // ✅ Mettre à jour le contexte utilisateur
      setUser({
        userId: data.user.id,
        email: data.user.email,
        role: data.user.role,
      });

      toast.success("Connexion réussie !");

      // ✅ Redirection selon le rôle
      if (data.user.role === "admin") {
        router.push("/dashboard");
      } else if (data.user.role === "entreprise") {
        router.push("/");
      } else {
        router.push("/menu");
      }
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Erreur lors de la connexion";
        toast.error(message);
      } else {
        toast.error("Une erreur inconnue s'est produite");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center ">Connexion</h1>

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

          <button
            type="submit"
            className="w-full bg-[#F28C28] text-white py-2 rounded-lg cursor-pointer transition hover:bg-[#d6791e]"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center">
          Vous {"n'avez"} pas de compte ?{" "}
          <Link href="/register" className="text-[#F28C28]">
{"            S'inscrire"}          </Link>
        </p>
      </div>
    </div>
  );
}
