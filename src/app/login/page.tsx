import LoginPopIn from "@/components/LoginPopIn";

export default function Login() {
  return (
    <div className="m-10">

      <main className=" bg-[#F4ECE2]">
        <div className="flex flex-row flex-wrap justify-center h-screen items-center">
          <LoginPopIn adresseMail="" motDePasse="" />
        </div>
      </main>
    </div>
  );
}