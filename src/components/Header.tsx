import Image from "next/image"


export default function Header() {
  return(
    <div className="flex flew-row justify-between">
      <div className="flex">
        <Image src="/logo/Logo.svg" alt="SkillFusion Logo" width={150} height={60} />
        <h1 className="flex font-display-title items-center font-bold text-4xl text-primary-red mx-5 ">SkillFusion</h1>
      </div>
      <div>
        <button type="button" className="m-5 p-2.5 border-2 font-bold rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"> listes des cours </button>
        <button type="button" className="m-5 p-2.5 border-2 font-bold rounded-md border-primary-red bg-primary-red text-background-charte cursor-pointer"> Se connecter </button>
      </div>
    </div>

  )
};