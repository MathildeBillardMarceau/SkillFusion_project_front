import CoursesCard from "@/components/CoursesCard";

export default function Courses() {
  return (
    <div className="m-10">
      <main className=" bg-[#F4ECE2]">
        <div className="flex flex-row flex-wrap justify-center ">
          <CoursesCard
            image="/images/niveau-a-bulle.jpg"
            title="Poser une étagère" 
            date="19 Mai 2025" 
            description="Les étagères contre les murs sont des éléments souvent rencontrés..." 
          />
          <CoursesCard
            image="/images/peinture.jpg"
            title="Peindre mon plafond" 
            date="01 Avril 2025" 
            description="Une belle hauteur sous plafond c'est super, jusqu'à ce qu'il faille le..." 
          />
          <CoursesCard 
            image="/images/plomberie.jpg"
            title="Changer son robinet d'arrivé d'eau" 
            date="31 Octobre 2025" 
            description="Pour pouvoir intervenir sur son réseau domestique, il est pratique de..." 
          />
                    <CoursesCard
            image="/images/niveau-a-bulle.jpg"
            title="Poser une étagère" 
            date="19 Mai 2025" 
            description="Les étagères contre les murs sont des éléments souvent rencontrés..." 
          />
          <CoursesCard
            image="/images/peinture.jpg"
            title="Peindre mon plafond" 
            date="01 Avril 2025" 
            description="Une belle hauteur sous plafond c'est super, jusqu'à ce qu'il faille le..." 
          />
          <CoursesCard 
            image="/images/plomberie.jpg"
            title="Changer son robinet d'arrivé d'eau" 
            date="31 Octobre 2025" 
            description="Pour pouvoir intervenir sur son réseau domestique, il est pratique de..." 
          />
        </div>
      </main>
    </div>
  );
}