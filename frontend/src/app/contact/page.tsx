"use client";
import { useState } from "react";
import Footer from "../footer/page";
import Navbar from "../Navbar/page";
import Image from "next/image";
export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.message) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    console.log("Données envoyées :", formData);
    setSuccess("Merci ! Votre message a été envoyé.");
    setFormData({ nom: "", email: "", message: "" });
  };
 return (
    <>
      <Navbar />

      <div className="mt-30 max-w-5xl mx-auto p-6 flex flex-col md:flex-row items-center gap-10">
        {/* Image décorative */}
        <div className="w-full md:w-1/2">
          <Image
            src="/images.jpg" 
            alt="contact"
            width={500}
            height={500}
            className="rounded shadow"
          />
        </div>

   
          <div className="max-w-4xl mx-auto px-6 text-center mb-16 ">
        <h2 className="text-3xl font-bold text-[#F28C28] mb-6">
          Contactez-nous
        </h2>
        <p className="text-black mb-8">
          Une question, une commande spéciale ou un partenariat ? Écrivez-nous
          directement ici :
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <input
            type="text"
            placeholder="Votre nom"
            className="p-4 rounded-lg border border-black focus:border-[#F28C28] outline-none text-black"
            required
          />
          <input
            type="email"
            placeholder="Votre email"
            className="p-4 rounded-lg border  border-black focus:border-[#F28C28] outline-none text-gblack"
            required
          />
          <textarea
            placeholder="Votre message"
            className="md:col-span-2 p-4 h-32 rounded-lg  border  border-black focus:border-[#F28C28] outline-none text-black resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 py-3 px-8 bg-[#F28C28] hover:bg-white hover:text-[#F28C28] hover:border border-[#F28C28] text-white font-semibold rounded-lg transition-all duration-300"
          >
            Envoyer
          </button>
        </form>
      </div>
      </div>
<div className="mt-10">   
     <Footer />
</div>
    </>
  );

}
