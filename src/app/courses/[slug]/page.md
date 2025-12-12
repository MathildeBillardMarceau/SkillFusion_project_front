 <div
        className={`bg-[#F4ECE2] transition-all duration-300 ${
          showLogin ? "blur-sm" : ""
        }`}
        // modifie le blur en arrière plan quand on affiche le login
        // doit contenir toute la page (ou tous les éléments qu'on veut blur donc pas le header par exemple)
      >
        <main className="flex min-h-screen w-full mx-auto max-w-7xl flex-col items-center justify-between py-32 px-16 bg-[#F0F] dark:bg-black sm:items-start">
          <p>TITRE DU COURS</p>
          <div className="flex basis-full w-full items-center justify-between space-between 10%  bg-[yellow]">
            {/* <div className="flexbox principale qui se coupe en deux verticalement"> */}
            <div className="flex-col w-2/3 bg-[blue]">
              {/* <div className="flexbox de gauche qui prends les 2/3 et se coupe horizontalement"> */}
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
            <div className="flex-col w-1/3 bg-[green]">
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