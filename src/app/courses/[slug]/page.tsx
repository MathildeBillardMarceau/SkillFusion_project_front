"use client";
// le useState (nécéssaire pour le showlogin)
import Image from "next/image";
import Link from "next/link";
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
  const [checkedChapter, setCheckedChapter] = useState(false);
  // permet de définir les chapitres déjà cochés (mockup marche sur 1 uniquement)
  const [currentChapter, setCurrentChapter] = useState(false);
  // permet d'afficher le chapitre en cours (mockup marche sur 3 uniquement)
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
        <main className="flex flex-col h-[calc(100vh-HEADER_HEIGHT)] w-full mx-auto max-w-7xl  items-center justify-between gap-x-[5%] gap-y-4 py-4 px-2 dark:bg-black sm:items-start">
          {/* titre du chapitre */}
          <h2 className="font-display-title font-bold text-2xl text-primary-red mx-2">
            Changer son tableau électrique
          </h2>
          {/* contenu du cours */}
          <div className="flex basis-full w-full items-start justify-between space-between 0% p-1">
            {/* <div className="flexbox principale qui se coupe en deux verticalement"> */}
            <div className="flex flex-col w-[68%] ">
              {/* <div className="flexbox de gauche qui prends les 2/3 et se coupe horizontalement"> */}
              {/* l'idée ici c'est d'avoir une image en 16/9 comme ça ce sera bon aussi pour les vidéos*/}
              <div className="w-full relative aspect-[16/9] overflow-hidden rounded-4xl">
                <Image
                  src="/images/tableau_electrique.jpg"
                  alt="tableau électrique"
                  fill
                  // style={{ objectFit: "cover" }}
                  className="absolute top-0 left-0 object-cover"
                />
              </div>
              <div className="flex flex-col gap-6 p-2">
                <h3 className="font-bold capitalize  text-primary-red">
                  Etape 5
                </h3>
                <h4 className="font-bold capitalize  text-primary-red">
                  Traçage des repères
                </h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32.
                </p>
                <h4 className="font-bold capitalize  text-primary-red">
                  Préparer les trous dans le placo
                </h4>
                <p>
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Sections 1.10.32 and
                  1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                  also reproduced in their exact original form, accompanied by
                  English versions from the 1914 translation by H. Rackham.
                </p>
                <h4 className="font-bold capitalize  text-primary-red">
                  Vérifier qu'on ne perce pas dans un cable
                </h4>
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
            <div className="flex flex-col w-[28%] gap-12 ">
              {/* ici on va définir les éléments de la colonne de gauche */}
              <ul className="min-h-20 w-60 md:w-full flex flex-col gap-4 border-4 rounded-md border-primary-red shadow-xl/30">
                {/* la classe du ul est la même que la classe du div ci-dessous */}
                {/* les li vont être gérénées automatiquement */}
                <li className="flex flex-row justify-between font-bold p-2">
                  Etape 1{" "}
                  <input
                    type="checkbox"
                    className={`appearance-none border-primary-red w-6 h-6 border-3 rounded 
                      ${checkedChapter ? "bg-primary-red" : "border-primary-red"}`}
                    checked={checkedChapter}
                    onChange={() => setCheckedChapter(!checkedChapter)}
                  />
                </li>
                <li className="flex flex-row justify-between font-bold p-2">
                  Etape 2{" "}
                  <input
                    type="checkbox"
                    className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
                  />
                </li>
                <li>
                  <Link
                    href={`http://localhost:3000/courses/erty`}
                    className={`flex flex-row justify-between font-bold p-2 ${
                      currentChapter
                        ? "border-primary-red border-t-2 border-b-2  bg-primary-red/30"
                        : ""
                    } `}
                    onClick={() => setCurrentChapter(!currentChapter)}
                  >
                    {" "}
                    <span>Etape 3</span>
                    <input
                      type="checkbox"
                      className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
                    />
                  </Link>
                </li>
                <li className="flex flex-row justify-between p-2">
                  Etape 1{" "}
                  <input
                    type="checkbox"
                    className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
                  />
                </li>
                <li className="flex flex-row justify-between p-2">
                  Etape 2{" "}
                  <input
                    type="checkbox"
                    className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
                  />
                </li>
                <li className="flex flex-row justify-between p-2">
                  Etape 3{" "}
                  <input
                    type="checkbox"
                    className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
                  />
                </li>
              </ul>
              {/* cette className est la même que l'élément au-dessus (le ul) */}
              <dl className="min-h-20 w-60 md:w-full flex flex-col gap-4 p-2 border-4 rounded-md border-primary-red justify-between shadow-xl/30">
                <div className="flex flex-row gap-2">
                  <dt className="font-bold capitalize">durée:</dt> <dd>2H30</dd>
                </div>
                <div className="flex flex-row gap-2">
                  <dt className="font-bold capitalize">niveau:</dt>{" "}
                  <dd>débutant</dd>
                </div>
                <div className="flex flex-row gap-2">
                  <dt className="font-bold capitalize">cout:</dt>{" "}
                  <dd>faible</dd>
                </div>
                <div>
                  <dt className="font-bold capitalize">outils:</dt>
                  <dd>perceuse</dd> <dd>crayon</dd> <dd>niveau à bulle</dd>
                  <dd>cheville à expansion</dd>
                  <dd>pince pour cheville Molly</dd>
                  <dd>marteau</dd>
                </div>
              </dl>
            </div>
          </div>
          {/* contenu du forum */}
          <div className="flex flex-col gap-2 basis-full w-full min-h-30">
            {/* un post du forum */}
            <div className="flex flex-row p2 w-full p-1  border-primary-red shadow-xl/30 border-4 rounded-md bg-altground/50 ">
              <div className="  flex flex-col items-center justify-start w-[20%] p-2">
                <Image
                  src="/avatar/av01.jpg"
                  alt="avatar de av01"
                  width={150}
                  height={150}
                  className="border-primary-red border-2 rounded"
                />
                <h5 className="font-bold text-primary-red">Avatar 01</h5>
              </div>
              <div className=" flex flex-col justify-around w-[80%] p-4">
                <p className="italic font-light">10/12/2025 - 22H05</p>
                <p>
                  J'ai vraiment beaucoup aimé ce cour pour apprendre à bien
                  positionner mon tableau électrique. J'avais un peu peur de me
                  prendre un coup de jus, heureusement j'ai demandé à ma copine
                  avatar08 de me sécuriser au cas ou. En fait c'était une idée
                  idiote, parce que sans tableau, pas de disjoncteur pour couper
                  le courant si je m'électrocute
                </p>
                <button
                  type="button"
                  className="  self-end w-25 m-5 right-0 bottom-0 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
                >
                  Corriger
                </button>
              </div>
            </div>
            {/* un post du forum */}
            <div className="flex flex-row p2 w-full  p-1  border-primary-red shadow-xl/30 border-4 rounded-md">
              <div className=" flex flex-col justify-around w-[80%] p-4 ">
                <p className="italic font-light">10/12/2025 - 22H20</p>
                <p>
                  C'est vrai, du coup j'ai coupé le courant de tout l'immeuble
                  pour plus de sécurité. Le problème des tours IGH c'est que
                  quand on coupe 400 logements d'un coup ça fait une surtention
                  sur le secteur et ça a fait griller des équipements
                  électriques chez les voisins. 😅 <br />
                  <br />
                  <br />
                  Mais au moins on est vivantes lol 😹
                </p>
                <button
                  type="button"
                  className=" self-end w-25 m-5 right-0 bottom-0 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
                >
                  Corriger
                </button>
              </div>
              <div className=" flex flex-col items-center justify-start w-[20%] p-2">
                <Image
                  src="/avatar/av08.jpg"
                  alt="avatar de av08"
                  width={150}
                  height={150}
                  className="border-primary-red border-3 rounded"
                />
                <h5 className="font-bold text-primary-red">Avatar 08</h5>
              </div>
            </div>
            {/* un post du forum */}
            <div className="flex flex-row p2 w-full  p-1  ">
              <div className=" flex flex-col items-center justify-start w-[20%] rounded-tl-md rounded-bl-md p-2  border-primary-red shadow-xl/30 border-t-4 border-b-4 border-l-4">
                <Image
                  src="/avatar/av05.jpg"
                  alt="avatar de av05"
                  width={150}
                  height={150}
                  className="border-primary-red border-3 rounded"
                />
                <p className="font-bold text-primary-red">Avatar 05</p>
              </div>
              <div className=" flex flex-col justify-around w-[80%] rounded-tr-md rounded-br-md p-2 border-primary-red shadow-xl/30 border-t-4 border-b-4 border-r-4 ">
                <p className="italic font-light">10/12/2025 - 22H20</p>
                <p>
                  Désolé, mais je ne peux pas générer de spam, même fictif — ça
                  facilite des usages abusifs. ✅ Si ton but est juste de tester
                  l’affichage / mise en page dans ton interface, je peux te
                  générer un texte neutre qui imite la forme d’un message de
                  spam, sans contenu nuisible ni intention malveillante. Par
                  exemple : « Bonjour, je suis un robot publicitaire fictif
                  utilisé uniquement pour tester l’affichage des messages. Ceci
                  est un texte de démonstration qui simule un message
                  promotionnel générique, sans lien ni incitation réelle. Merci
                  de ne pas tenir compte de son contenu. » Tu veux que je t’en
                  génère un court, long, ou très caricatural pour tes tests d’UI
                  ?<br />
                  <br />
                  Désolé, mais je ne peux pas générer de spam, même fictif — ça
                  facilite des usages abusifs. ✅ Si ton but est juste de tester
                  l’affichage / mise en page dans ton interface, je peux te
                  générer un texte neutre qui imite la forme d’un message de
                  spam, sans contenu nuisible ni intention malveillante. Par
                  exemple : « Bonjour, je suis un robot publicitaire fictif
                  utilisé uniquement pour tester l’affichage des messages. Ceci
                  est un texte de démonstration qui simule un message
                  promotionnel générique, sans lien ni incitation réelle. Merci
                  de ne pas tenir compte de son contenu. » Tu veux que je t’en
                  génère un court, long, ou très caricatural pour tes tests d’UI
                  ?
                </p>
                <button
                  type="button"
                  className=" self-end w-25 m-5 right-0 bottom-0 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
                >
                  Corriger
                </button>
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
