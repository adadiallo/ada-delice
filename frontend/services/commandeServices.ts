import api from "../utils/api";

export const commandeService = {
  // ✅ Créer une commande à partir du panier utilisateur
  create: async (userId: number) => {
    const res = await api.post(`/commande/${userId}`);
    return res.data;
  },
  
};
export const getCommandes = async () => {
  const response = await api.get("/commandes/all");
  return response.data;
};
