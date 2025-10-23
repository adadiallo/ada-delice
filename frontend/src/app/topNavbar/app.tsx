"use client";


export default function navbarTop(){
    return(
        <div className="bg-[#0B132B] text-white text-sm py-2 px-6 md:px-20 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-[#F28C28]">📞</span>
          <span>+221 77 000 00 00</span>
        </div>

        <div className="hidden md:block">
          Déjà plus de{" "}
          <span className="text-[#F28C28] font-semibold">15 000</span> repas livrés aux entreprises de Dakar !
        </div>
      </div>
    )
};