import api from "../utils/api";

export const commandeService = {
  // ✅ Créer une commande à partir du panier utilisateur connecté
  create: async (currency = "XOF") => {
    const res = await api.post("/commandes/valider", { currency });
    return res.data;
  },

  // ✅ Récupérer toutes les commandes
  getAll: async () => {
    const res = await api.get("/commandes/all");
    return res.data;
  },

  // ✅ Mettre à jour le statut d'une commande
  updateStatut: async (id: number, statut: "en attente" | "validée" | "livrée") => {
    const res = await api.patch(`/commandes/${id}/statut`, { statut });
    return res.data;
  },
};
