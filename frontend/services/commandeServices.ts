import api from "../utils/api";

export const commandeService = {
  // ✅ Créer une commande à partir du panier utilisateur
  create: async (userId: number) => {
    const res = await api.post(`/commande/${userId}`);
    return res.data;
  },
};
