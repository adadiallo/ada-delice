
import api from "../utils/api";

export type MenuEmployer = {
  id: number;
  type: "petit_dejeuner" | "repas";
  nom: string;
  prix: number;
  description: string;
  jour?: string;
  image?: string;
};

export const getMenus = async (): Promise<MenuEmployer[]> => {
  const res = await api.get("/menu-employer");
  return res.data;
};

export const createMenu = async (formData: FormData): Promise<MenuEmployer> => {
  const res = await api.post("/menu-employer", formData);
  return res.data;
};

export const updateMenu = async (id: number, formData: FormData): Promise<MenuEmployer> => {
  const res = await api.patch(`/menu-employer/${id}`, formData);
  return res.data;
};

export const deleteMenu = async (id: number): Promise<void> => {
  await api.delete(`/menu-employer/${id}`);
};
