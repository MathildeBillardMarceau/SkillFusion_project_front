"use client";
import Dashboard from "@/components/Dashboard";
import ProfilOnDashboard from "@/components/ProfilOnDashboard";

export default function ProfilDashboard() {

  
  return (
    <div>
      <main className="flex w-auto bg-[#F4ECE2] m-5">
        <div className="w-1/3 px-5">
          <ProfilOnDashboard/>
        </div>
        <div className="w-2/3 mx-5">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}