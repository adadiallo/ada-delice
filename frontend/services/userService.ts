import api from "../utils/api";

// 🔹 Récupérer la liste des entreprises
export const getEntreprises = async () => {
  const response = await api.get("/user/entreprises");
  return response.data;
};

// 🔹 Inscription utilisateur
export const registerUser = async (data: {
  email: string;
  password: string;
  role: "entreprise" | "employee";
  nomEntreprise: string;
  nom?: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
