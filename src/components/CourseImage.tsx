import Image from "next/image";

export default function ShowCourseImage() {
  return (
    <div className="w-full relative aspect-[16/9] overflow-hidden rounded-4xl">
      <Image
        src="/images/tableau_electrique.jpg"
        alt="tableau électrique"
        fill
        // style={{ objectFit: "cover" }}
        className="absolute top-0 left-0 object-cover"
      />
    </div>
  );
}
