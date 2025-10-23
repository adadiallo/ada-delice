"use client";
import { useState } from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import DashboardLayout from "../dashboard/page";

type Menu = {
  id: number;
  nom: string;
  prix: number;
};

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ nom: "", prix: "" });
  const [editId, setEditId] = useState<number | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormData({ nom: "", prix: "" });
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      // Modification
      setMenus((prev) =>
        prev.map((menu) =>
          menu.id === editId
            ? { ...menu, nom: formData.nom, prix: Number(formData.prix) }
            : menu
        )
      );
    } else {
      // Ajout
      const newMenu = {
        id: Date.now(),
        nom: formData.nom,
        prix: Number(formData.prix),
      };
      setMenus([...menus, newMenu]);
    }
    closeModal();
  };

  const handleEdit = (menu: Menu) => {
    setFormData({ nom: menu.nom, prix: String(menu.prix) });
    setEditId(menu.id);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setMenus(menus.filter((menu) => menu.id !== id));
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={openModal}
          className="bg-[#F28C28] text-white p-2 rounded flex items-center gap-2 hover:bg-orange-600"
        >
          <FiPlus /> Ajouter un menu
        </button>
      </div>

      {/* Liste des menus */}
<div className="bg-white p-4  mt-6">
        {menus.length === 0 ? (
          <p>Aucun menu ajouté.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Nom</th>
                <th className="border p-2 text-left">Prix</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id}>
                  <td className="border p-2">{menu.nom}</td>
                  <td className="border p-2">{menu.prix} FCFA</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(menu)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(menu.id)}
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal (100% Tailwind) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editId !== null ? "Modifier" : "Ajouter"} un menu
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom du menu"
                value={formData.nom}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="prix"
                placeholder="Prix"
                value={formData.prix}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#F28C28] text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  {editId !== null ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
