import api from "../utils/api";

export const panierService = {
  // ✅ Récupérer le panier de l’utilisateur connecté
  getCart: async () => {
    const res = await api.get("/panier");
    return res.data;
  },

  // ✅ Ajouter un produit au panier
  addItem: async (menuId: number, quantite: number) => {
    const res = await api.post("/panier/add", { menuId, quantite });
    return res.data;
  },

  // ✅ Mettre à jour la quantité d’un produit
  updateItem: async (menuId: number, quantite: number) => {
    const res = await api.patch("/panier/update", { menuId, quantite });
    return res.data;
  },

  // ✅ Supprimer un produit du panier
  removeItem: async (menuId: number) => {
    const res = await api.delete(`/panier/remove/${menuId}`);
    return res.data;
  },

  // ✅ Obtenir le nombre d’articles
  getCountByUser: async () => {
    const res = await api.get("/panier/count");
    return res.data.count;
  },
};
