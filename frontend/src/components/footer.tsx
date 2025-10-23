"use client";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F28C28] text-white pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#F28C28]/10 via-transparent to-transparent pointer-events-none"></div>

    

      <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-white">À propos</h2>
          <p className="text-white leading-relaxed">
            Nous livrons des repas sains et équilibrés directement à votre
            entreprise ou domicile. <br /> Gagnez du temps et régalez-vous
            chaque jour !
          </p>
        </div>

        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Liens utiles
          </h2>
          <ul className="space-y-3 text-white">
            <li>
              <a href="/menu-du-jour" className="transition">
                Menu du jour
              </a>
            </li>
            <li>
              <a href="/login" className="transition">
                Se connecter
              </a>
            </li>
            <li>
              <a href="/inscription" className=" transition">
                S’inscrire
              </a>
            </li>
            <li>
              <a href="/contact" className=" transition">
                Contactez-Nous
              </a>
            </li>
          </ul>
        </div>

        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Suivez-nous
          </h2>
          <div className="flex space-x-5">
            {[
              { Icon: FaFacebookF, name: "Facebook" },
              { Icon: FaInstagram, name: "Instagram" },
              { Icon: FaTwitter, name: "Twitter" },
            ].map(({ Icon, name }, i) => (
              <a
                key={i}
                href="#"
                aria-label={name}
                className="p-3 bg-[#F28C28] hover:text-[#F28C28] border border-white rounded-full hover:bg-white transition transform hover:scale-110 shadow-md"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-4/5 mx-auto h-px bg-white my-8"></div>

      <div className="text-center text-white text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">AdaDelices</span>. Tous
        droits réservés.
      </div>
    </footer>
  );
}
