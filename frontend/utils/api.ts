import axios from "axios";

// ✅ Création d'une instance axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

// ✅ Intercepteur pour ajouter automatiquement le token JWT
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ (Optionnel) Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si le token est expiré → on déconnecte l’utilisateur
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirige vers la page de login
    }
    return Promise.reject(error);
  }
);

export default api;
