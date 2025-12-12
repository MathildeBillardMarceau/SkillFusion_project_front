export default function ShowCourseTools() {
  return (
    <dl className="min-h-20 w-60 md:w-full flex flex-col gap-4 p-2 border-4 rounded-md border-primary-red justify-between shadow-xl/30">
      <div className="flex flex-row gap-2">
        <dt className="font-bold capitalize">durée:</dt> <dd>2H30</dd>
      </div>
      <div className="flex flex-row gap-2">
        <dt className="font-bold capitalize">niveau:</dt> <dd>débutant</dd>
      </div>
      <div className="flex flex-row gap-2">
        <dt className="font-bold capitalize">cout:</dt> <dd>faible</dd>
      </div>
      <div>
        <dt className="font-bold capitalize">outils:</dt>
        <dd>perceuse</dd> <dd>crayon</dd> <dd>niveau à bulle</dd>
        <dd>cheville à expansion</dd>
        <dd>pince pour cheville Molly</dd>
        <dd>marteau</dd>
      </div>
    </dl>
  );
}
