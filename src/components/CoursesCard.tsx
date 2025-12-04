
interface ICoursesCardProps {
  title: string;
  date: string;
  description: string;
}

export default function Courses({title, date, description}: ICoursesCardProps) {
  return (
    <div className="">
      <main className="py-25 px-5 bg-[#F4ECE2] sm:items-start">
        <div className="text-primary border-2 rounded-md color-[">
          <h3>{title}</h3>
          <h4>{date}</h4>
            <p>{description} </p>
          <button>Voir</button>
        </div>
      </main>
    </div>
  );
}