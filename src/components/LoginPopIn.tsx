import Image from "next/image";

interface ILoginPopInProps {
  adresseMail: string;
  motDePasse: string;
}


export default function LoginPopIn({ adresseMail, motDePasse }: ILoginPopInProps) {
  return(
    <div className="min-h-90 h-90 w-60 md:w-100 flex flex-col border-4 rounded-md border-primary-red justify-between shadow-xl/30 bg-primary-red">
      <div className="flex self-end">
        <button className="m-2 cursor-pointer">
          <p className="text-background-charte ">
          X
          </p>
        </button>
      </div>
      <div className="flex justify-center ">
      <button className="flex justify-center cursor-pointer">
      <Image src="/logo/Logo.svg" alt="Login Image" width={400} height={120} className="max-w-20 flex justify-center object-cover w-20 h-20 mb-1 rounded-full border-2 bg-background-charte border-background-charte"/>
      </button>
      </div>
      <div>
      <form className="flex flex-col m-5">
        <label className="font-display font-normal text-background-charte mb-1">Adresse Mail</label>
        <input type="email" value={adresseMail} className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte"/>
        <label className="font-display font-normal text-background-charte mb-1">Mot de Passe</label>
        <input type="password" value={motDePasse} className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte outline-hidden"/>
        <button type="submit" className=" self-end w-30 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer ">Se connecter</button>
      </form>
      </div>
    </div>
  )
}