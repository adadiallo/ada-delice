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
export const updateCommandeStatut = async (id: number, statut: string) => {
  const response = await api.patch(`/commandes/${id}/statut`, { statut });
  return response.data;
};