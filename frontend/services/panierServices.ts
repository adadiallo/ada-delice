import api from "../utils/api";

export const panierService = {
  // ✅ Récupérer le panier d’un utilisateur
  getByUser: async (userId: number) => {
    const res = await api.get(`/panier/${userId}`);
    return res.data;
  },

  // ✅ Mettre à jour la quantité
  updateItem: async (menuId: number, quantity: number) => {
    const res = await api.patch(`/panier/update-item/${menuId}/${quantity}`);
    return res.data;
  },

  // ✅ Supprimer un produit
  removeItem: async (menuId: number) => {
    const res = await api.delete(`/panier/remove-item/${menuId}`);
    return res.data;
  },

  // ✅ Valider le panier (ou passer commande)
  validate: async (userId: number) => {
    const res = await api.post(`/commandes/valider`, { userId });
    return res.data;
  },
   getCountByUser: async () => {
    const res = await api.get("/panier/count");
    return res.data.count; // ou { count: number } selon ton backend
  },
};
