# ForumPost Component

## Structure de l'objet
- un div qui fait la bordure et et la couleur de fond (couleur devra varier) et qui affiche deux éléments en colonne
  - le contenu user + post + vide (user et vide s'inversent si le poster est user)
    - user contient deux parties en col
      - une photo en 150x150 (forcée)
      - le nom de user (en h5 pour la coloration auto)
    - message
    - espace vide (pour aligner les messages au centre)
  - le contenu de gestion qui contient
    - la date du message
    - les boutons pour éditer, admin, report ...

## éléments interactifs
- faire varier la couleur du background (un sur deux)
- inverser le coté ou user s'affiche si current user

## données à récupérer
- utilisateur: nom + avatar (+ role pour boutons)
  - nom affiché dans le champ + 
  - avatar sert à
- message: le contenu du message (mettre des <p> pour faire des lignes) + la date et l'heure du message

## au-delà, depuis l'appel par page.tsx
- il faudra une boucle qui va passer le N° du message pour définir sa coloration


## le fichier mockup

```ts
import Image from "next/image";

export default function ShowPost() {
  return (
    // bord de la case
    <div className="flex flex-col p2 w-full p-1 shadow-xl/30 rounded-md bg-altground/50 ">
      {/* partie avatar et message */}
      <div className="flex flex-row p2 w-full p-1">
        <div className="  flex flex-col items-center justify-start w-[15%] p-2">
          <div className="relative w-[150px] h-[150px]">
            {/* div pour définir la taille de l'image même quand elle déborde + utilisation de fill et object-cover pour que toutes tiennent dans le carré 150x150 */}
            <Image
              src="/avatar/avatar.jpg"
              alt="avatar de av03"
              fill
              className="border-primary-red border-2 rounded object-cover"
            />
          </div>
          <h5 className="font-bold text-primary-red">Component</h5>
        </div>
        <div className=" flex flex-col w-[70%] p-4">
          <p>Importation du message depuis le component</p>
          <p>Importation du message depuis le component</p>
          <p>Importation du message depuis le component</p>
        </div>
        <div className="  flex flex-row  justify-start w-[15%] p-2"></div>
      </div>
      {/* partie gestion sous le post (date et boutons) */}
      <div className="flex flex-row w-[70%] mx-auto p-1">
        {/* partie date aligner à gauche*/}
        <div className="flex justify-start w-full gap-2">
          <p className="italic font-light">11/12/2025 - 11H23</p>
        </div>
        {/* groupe de boutons - aligner à droite */}
        <div className="flex justify-end w-full gap-2">
          <button
            type="button"
            className="  px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
          >
            Editer (owner)
          </button>
          <button
            type="button"
            className="px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
          >
            Modérer (admin)
          </button>
          <button
            type="button"
            className="px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
          >
            Signaler! (all)
          </button>
        </div>
      </div>
    </div>
  );
}
```