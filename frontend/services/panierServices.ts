import api from "../utils/api";

export const panierService = {
  // ✅ Créer un panier
  create: async (userId: number, items: { menuId: number; quantity: number }[]) => {
    const res = await api.post("/panier", { userId, items });
    return res.data;
  },

  // ✅ Récupérer le panier d’un utilisateur
  getByUser: async (userId: number) => {
    const res = await api.get(`/panier/${userId}`);
    return res.data;
  },

  // ✅ Mettre à jour la quantité d’un item
  updateItem: async (itemId: number, quantity: number) => {
    const res = await api.patch(`/panier/update-item/${itemId}/${quantity}`);
    return res.data;
  },

  // ✅ Supprimer un item
  removeItem: async (itemId: number) => {
    const res = await api.delete(`/panier/remove-item/${itemId}`);
    return res.data;
  },

  // ✅ Valider le panier
  validate: async (panierId: number) => {
    const res = await api.patch(`/panier/validate/${panierId}`);
    return res.data;
  },
};
