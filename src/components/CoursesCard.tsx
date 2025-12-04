import Image from "next/image";

interface ICoursesCardProps {
  image: string;
  title: string;
  date: string;
  description: string;
}

export default function Courses({image, title, date, description}: ICoursesCardProps) {
  return (
    <div className="max-w-300 max-h-500 ">
      <main className="py-10 px-5 bg-background-charte sm:items-start">
        <div className="min-h-100 h-105 w-100 flex flex-col border-4 rounded-md border-primary-red justify-between shadow-xl/30">
          <Image src={image} alt={title} width={400} height={120} />
          <div>
            <h3 className="font-display-title font-bold text-primary-text mx-1">{title}</h3>
            <h4 className="font-display-light font-light text-secondary-text mx-1">{date}</h4>
          </div>
          <div className="flex flex-row m-0.5">
            <p className="font-display font-normal text-primary-text my-2 mx-1">{description} </p>
            <button type="button" className=" self-end w-15 m-5 sticky right-0 bottom-0 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer">Voir</button>
          </div>
        </div>
      </main>
    </div>
  );
}