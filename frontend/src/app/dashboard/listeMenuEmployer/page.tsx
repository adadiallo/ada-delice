"use client";
import { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import Image from "next/image";
import DashboardLayout from "../layout";
import { MenuEmployer, getMenus, createMenu, updateMenu,deleteMenu} from "../../../../services/menuService";
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/protectedRoe";

export default function MenuEmployerManager() {
  const [menus, setMenus] = useState<MenuEmployer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuEmployer | null>(null);

  const [form, setForm] = useState({
    type: "petit_dejeuner",
    prix: "",
    nom: "",
    description: "",
    jour: "",
    imageFile: null as File | null,
  });

  useEffect(() => {
    fetchMenuEmployer();
  }, []);

  const fetchMenuEmployer = async () => {
    try {
      const data = await getMenus();
      setMenus(data);
    } catch (error) {
      console.error("Erreur fetch:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté pour ajouter/modifier un menu");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("nom", form.nom);
      formDataObj.append("description", form.description);
      formDataObj.append("prix", form.prix);
      formDataObj.append("type", form.type);
      if (form.jour) formDataObj.append("jour", form.jour);
      if (form.imageFile) formDataObj.append("image", form.imageFile);

      let data: MenuEmployer;

      if (selectedMenu) {
        data = await updateMenu(selectedMenu.id, formDataObj);
        setMenus(menus.map((m) => (m.id === data.id ? data : m)));
                  toast.success('menu modifié')

      } else {
        data = await createMenu(formDataObj);
        setMenus([...menus, data]);
                  toast.success('menu ajouté ')

      }

      setShowModal(false);
      setSelectedMenu(null);
      setForm({
        nom: "",
        description: "",
        prix: "",
        type: "petit_dejeuner",
        jour: "",
        imageFile: null,
      });

    } catch (error) {
      console.error("Erreur submit:", error);
      alert("Erreur lors de la sauvegarde du menu");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce menu ?")) return;
          toast.success('menu supprimé')

    try {
      await deleteMenu(id);
      setMenus(menus.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Erreur delete:", error);
      alert("Impossible de supprimer le menu");
    }
  };

  const openEditModal = (menu: MenuEmployer) => {
    setSelectedMenu(menu);
    setForm({
      type: menu.type,
      nom: menu.nom,
      prix: menu.prix.toString(),
      description: menu.description,
      jour: menu.jour || "",
      imageFile: null,
    });
    setShowModal(true);
  };

  return (
        <ProtectedRoute allowedRoles={["admin"]}>

      <div className="max-w-6xl mx-auto mt-10 p-4 text-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#F28C28]">Liste des Menus</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#F28C28] text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
          >
            <FiPlus /> Ajouter
          </button>
        </div>

        {/* Tableau */}
        <table className="w-full border border-gray-200">
          <thead className="bg-[#F28C28] text-white text-left">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Type</th>
              <th className="p-2">Nom</th>
              <th className="p-2">Prix</th>
              <th className="p-2">Description</th>
              <th className="p-2">Jour</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-t hover:bg-orange-50">
                <td className="p-2">
                  <div className="w-12 h-12 rounded overflow-hidden border">
                    {menu.image ? (
                      <Image
                        src={menu.image}
                        alt={menu.nom}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        Aucune
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-2 capitalize">{menu.type}</td>
                <td className="p-2">{menu.nom}</td>
                <td className="p-2">{menu.prix} FCFA</td>
                <td className="p-2">{menu.description}</td>
                <td className="p-2">{menu.jour}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => openEditModal(menu)} className="text-blue-500 hover:text-blue-700">
                    <FiEdit />
                  </button>
                  <button onClick={() => handleDelete(menu.id)} className="text-red-500 hover:text-red-700">
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h2 className="text-lg font-semibold text-[#F28C28] mb-4">
                {selectedMenu ? "Modifier le menu" : "Ajouter un menu"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded"
                  required
                >
                  <option value="petit_dejeuner">Petit déjeuner</option>
                  <option value="repas">Repas</option>
                </select>

                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={form.nom}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="prix"
                  placeholder="Prix"
                  value={form.prix}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="date"
                  name="jour"
                  value={form.jour}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-2 rounded"
                />

                <div className="flex justify-between mt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
                    Annuler
                  </button>
                  <button type="submit" className="bg-[#F28C28] text-white px-4 py-2 rounded cursor-pointer">
                    {selectedMenu ? "Mettre à jour" : "Enregistrer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      </ProtectedRoute>
  );
}
