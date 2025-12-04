import Image from "next/image"


export default function Header() {
  return(
    <div className="flex md:flex-row flex-col justify-center md:justify-between">
      <div className="flex cursor-pointer justify-center md:justify-start">
        <Image src="/logo/Logo.svg" alt="SkillFusion Logo" width={150} height={60} className=""/>
        <h1 className="flex font-display-title items-center font-bold text-4xl text-primary-red mx-2 ">SkillFusion</h1>
      </div>
      <div className="flex justify-center md:justify-end ">
        <button type="button" className="md:min-w-45 md:max-h-15 m-2.5 p-2.5 border-2 font-bold rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"> listes des cours </button>
        <button type="button" className="md:min-w-45 md:max-h-15 m-2.5 p-2.5 border-2 font-bold rounded-md border-primary-red bg-primary-red text-background-charte cursor-pointer"> Se connecter </button>
      </div>

    </div>

  )
};