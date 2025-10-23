"use client";

import HeroSection from "@/components/page";
import Navbar from "./Navbar/page";
// import FormulesSection from "./formules/page";
// import SectionConfiance from "./partenaire/app";
import Footer from "@/components/footer";


export default function HomePage() {
  // const entreprises = [
  //   { id: 1, nom: "Entreprise A", logo: "/xarala.png" },
  //   { id: 2, nom: "Entreprise B", logo: "/volkeno.png" },
  //   { id: 3, nom: "Entreprise C", logo: "/wave.png" },
  //   { id: 4, nom: "Entreprise D", logo: "/expresso.png" },
  // ];

  return (
    <div className="min-h-screen flex flex-col">
     <Navbar/>

<HeroSection/>



{/* <FormulesSection/> */}


{/* <SectionConfiance/>      */}
<section className="py-20 px-6 md:px-20 bg-gray-100 overflow-hidden">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-gray-800 mb-6 fade-up">
      Nos <span className="text-[#F28C28]">Fonctionnalités</span>
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-12 fade-up">
      Découvrez les avantages qui rendent notre service unique et pratique pour vos équipes.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 fade-up">
      {/* Fonctionnalité 1 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center">
        <div className="w-20 h-20 bg-[#FFF3E0] text-[#F28C28] rounded-full flex items-center justify-center mb-5">
        
        </div>
        <h3 className="font-semibold text-xl text-[#2C2C2C] mb-2">Menus variés</h3>
        <p className="text-gray-600">
          Profitez de plats différents et équilibrés chaque jour pour vos pauses repas.
        </p>
      </div>

      {/* Fonctionnalité 2 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center">
        <div className="w-20 h-20 bg-[#FFF3E0] text-[#F28C28] rounded-full flex items-center justify-center mb-5">
     
        </div>
        <h3 className="font-semibold text-xl text-[#2C2C2C] mb-2">Livraison rapide</h3>
        <p className="text-gray-600">
          Vos repas livrés à temps directement à votre bureau, sans retard.
        </p>
      </div>

      {/* Fonctionnalité 3 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center">
        <div className="w-20 h-20 bg-[#FFF3E0] text-[#F28C28] rounded-full flex items-center justify-center mb-5">
       
        </div>
        <h3 className="font-semibold text-xl text-[#2C2C2C] mb-2">Commandes faciles</h3>
        <p className="text-gray-600">
          Passez vos commandes en quelques clics sur notre plateforme intuitive.
        </p>
      </div>

      {/* Fonctionnalité 4 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center">
        <div className="w-20 h-20 bg-[#FFF3E0] text-[#F28C28] rounded-full flex items-center justify-center mb-5">
       
        </div>
        <h3 className="font-semibold text-xl text-[#2C2C2C] mb-2">Paiement sécurisé</h3>
        <p className="text-gray-600">
          Payez en toute sécurité grâce à notre système fiable et protégé.
        </p>
      </div>
    </div>
  </div>
</section>


<Footer/>
    </div>
  );
}
