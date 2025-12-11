"use client";
import Header from "@/components/Header";
import { useState } from "react";
import LoginPopIn from "@/components/LoginPopIn";
import ProfilPopIn from "@/components/ProfilPopIn";
import Dashboard from "@/components/Dashboard";

export default function ProfilDashboard() {

  const [showLogin, setShowLogin] = useState(false);
  const [ showProfil, setShowProfil] = useState(false); 

  
  return (
  <div className="m-10 ">
      <div className={`bg-[#F4ECE2] transition-all duration-300 ${
        showLogin || showProfil ? "blur-sm" : ""
      }`}>
      <header>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Header onLoginclick={() => setShowLogin(true)} onProfilclick={() => setShowProfil(true)} />
      </header>
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