"use client";
// le useState (nécéssaire pour le showlogin)
import Image from "next/image";
// le popin pour se connecter
import { useState } from "react";
// directive nécéssaire pour utiliser useState
import Header from "@/components/Header";
// le composant header déjà utilisé dans les autres pages
import LoginPopIn from "@/components/LoginPopIn";

export default function SingleCourse() {
  // fonction qui va afficher l'ensemble de la page
  const [showLogin, setShowLogin] = useState(false);
  // on set le useState par défaut à false (je suppose qu'ensuite il faudra le récupérer ailleurs puisqu'on est déjà dans la navigation)
  return (
    // début de la fonction qui return le contenu de la page
    <div className="m-10 ">
      {/* container principal avec un margin de 10 */}
      <header>
        <Header onLoginclick={() => setShowLogin(true)} />
        {/* le composant header avec la valeur de setShowLogin */}
      </header>
      <div
        className={`bg-[#F4ECE2] transition-all duration-300 ${
          showLogin ? "blur-sm" : ""
        }`}
        // modifie le blur en arrière plan quand on affiche le login
        // doit contenir toute la page (ou tous les éléments qu'on veut blur donc pas le header par exemple)
      >
        <main className="flex flex-col h-[calc(100vh-HEADER_HEIGHT)] w-full mx-auto max-w-7xl  items-center justify-between gap-x-[5%] py-4 px-2 bg-[#F0F] dark:bg-black sm:items-start">
          <h2 className="font-display-title font-bold text-2xl text-primary-red mx-2">
            Changer son tableau électrique
          </h2>

          <div className="flex basis-full w-full items-center justify-between space-between 10%  bg-[yellow] py-1 px-1">
            {/* <div className="flexbox principale qui se coupe en deux verticalement"> */}
            <div className="flex-col w-[70%] bg-[blue]">
              {/* <div className="flexbox de gauche qui prends les 2/3 et se coupe horizontalement"> */}
              {/* l'idée ici c'est d'avoir une image en 16/9 comme ça ce sera bon aussi pour les vidéos*/}
              <div className="w-full relative aspect-[16/9]">
                <Image
                  src="/images/tableau_electrique.jpg"
                  alt="tableau électrique"
                  fill
                  // style={{ objectFit: "cover" }}
                  className="absolute top-0 left-0 object-cover"
                />
              </div>
              <div className="box de gauche haut avec le media"></div>
              <div className="box de gauche haut avec le contenu du cours et se coupe horizontalement">
                <p>Etape 5</p>
                <p>Traçage des repères</p>
                <p>
                  Traçages des repères Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Proin tortor purus platea sit eu id nisi
                  litora libero. Neque vulputate consequat ac amet augue blandit
                  maximus aliquet congue. Pharetra vestibulum posuere ornare
                  faucibus fusce dictumst orci aenean eu facilisis ut volutpat
                  commodo senectus purus himenaeos fames primis convallis nisi.
                  Phasellus fermentum malesuada phasellus netus dictum aenean
                  placerat egestas amet. Ornare taciti semper dolor tristique
                  morbi. Sem leo tincidunt aliquet semper eu lectus scelerisque
                  quis. Sagittis vivamus mollis nisi mollis enim fermentum
                  laoreet. Curabitur semper venenatis lectus viverra ex dictumst
                  nulla maximus. Primis iaculis elementum conubia feugiat
                  venenatis dolor augue ac blandit nullam ac phasellus turpis
                  feugiat mollis. Duis lectus porta mattis imperdiet vivamus
                  augue litora lectus arcu. Justo torquent pharetra volutpat ad
                  blandit bibendum accumsan nec elit cras luctus primis ipsum
                  gravida class congue. Vehicula etiam elementum finibus enim
                  duis feugiat commodo adipiscing tortor tempor elit. Et mollis
                  consectetur habitant turpis tortor consectetur adipiscing
                  vulputate dolor lectus iaculis convallis adipiscing. Nam
                  hendrerit dignissim condimentum ullamcorper diam morbi eget
                  consectetur odio in sagittis.
                </p>
              </div>
            </div>
            <div className="flex-col w-[25%] bg-[green]">
              <div className="box de droite haut avec la liste des chaptires">
                <ul>
                  <li>Etape 1</li>
                  <li>Etape 2</li>
                  <li>Etape 3</li>
                </ul>
              </div>
              <div className="box de droite bas avec les infos du cours">
                <p>durée: 2H30</p>
                <p>niveau: Débutant</p>
                <p>cout: minime</p>
                <p>
                  outils: perceuse, crayon,niveau à bulle, cheville
                  MOLLY,marteau
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* cette fonction affiche le popin login et est censé faire le blur en arrière plan */}
      {showLogin && (
        <LoginPopIn
          adresseMail=""
          motDePasse=""
          onClose={() => setShowLogin(false)}
        />
      )}
    </div>
  );
}
