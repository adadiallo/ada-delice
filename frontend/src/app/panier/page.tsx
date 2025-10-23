"use client";

import { usePanier } from "../../components/context/panierContext";
import NavbarEmployer from "../navbarEmployer/page";
import Footer from "../footer/page";
import Image from "next/image";

export default function PanierPage() {
  const { panier, total, loading, incrementer, decrementer, retirerDuPanier, validerCommande } = usePanier();

  return (
    <>
      <NavbarEmployer />
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Mon Panier</h1>

        {loading ? (
          <p className="text-center text-gray-500">Chargement du panier...</p>
        ) : panier.length === 0 ? (
          <p className="text-center text-gray-500">Votre panier est vide.</p>
        ) : (
          <>
            <div className="grid gap-6">
              {panier.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row items-center md:justify-between bg-white shadow-md rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Image src={item.image} alt={item.nom} width={80} height={80} className="rounded object-cover" />
                    <div>
                      <h2 className="font-semibold text-lg">{item.nom}</h2>
                      <p className="text-gray-500">Prix unitaire: {item.prix} FCFA</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button onClick={() => decrementer(item.id)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => incrementer(item.id)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                    <button onClick={() => retirerDuPanier(item.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Supprimer</button>
                  </div>

                  <div className="mt-4 md:mt-0 font-semibold text-lg">{item.prix * item.quantity} FCFA</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-8 p-4 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-xl font-bold text-gray-800">Total : {total} FCFA</p>
              <button
                onClick={validerCommande}
                disabled={loading}
                className="mt-4 md:mt-0 px-6 py-3 bg-[#F28C28] text-white font-semibold rounded-lg hover:bg-[#d77a1f] disabled:opacity-50"
              >
                Valider la commande
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
