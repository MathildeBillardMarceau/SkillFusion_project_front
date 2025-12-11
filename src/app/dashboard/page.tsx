"use client";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import LoginPopIn from "@/components/modals/LoginModal";
import ProfilPopIn from "@/components/modals/ProfilPopIn";
import { useState } from "react";

export default function ProfilDashboard() {

  const [showLogin, setShowLogin] = useState(false);
  const [ showProfil, setShowProfil] = useState(false); 

  
  return (
  <div className="m-10 ">
    <div>
      <main className=" bg-[#F4ECE2] relative">
      <Dashboard />
      </main>
    </div>
      <div>
        {showProfil && 
          <ProfilPopIn onClose={() => setShowProfil(false)} />}
      </div>
      <div>
        {showLogin && <LoginPopIn onClose={() => setShowLogin(false)} />}
      </div>
  </div>
  );
}