"use client";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
 
type Med = {
  name: string;
  dosage: string;
  time: string; // "HH:mm"
};
 
const dummyMeds: Med[] = [
  { name: "Paracetamol", dosage: "500mg", time: "08:30" },
  { name: "Amoxicillin", dosage: "250mg", time: "14:00" },
  { name: "Ibuprofen", dosage: "200mg", time: "21:00" },
];
 
function getNextMed(meds: Med[]): { med: Med; msLeft: number } | null {
  const now = new Date();
  for (const med of meds) {
    const [h, m] = med.time.split(":").map(Number);
    const medTime = new Date();
    medTime.setHours(h, m, 0, 0);
    if (medTime.getTime() > now.getTime()) {
      return { med, msLeft: medTime.getTime() - now.getTime() };
    }
  }
  return null;
}
 
function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h}h ${m}m ${s}s`;
}
 
export default function MedicationPage() {
  const [countdown, setCountdown] = useState("");
  const [nextMed, setNextMed] = useState<{ med: Med; msLeft: number } | null>(
    getNextMed(dummyMeds)
  );
 
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getNextMed(dummyMeds);
      if (updated) {
        setNextMed(updated);
        setCountdown(formatTime(updated.msLeft));
      } else {
        setNextMed(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
 
  return (
<>
<NavBar />
<div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white p-6 flex justify-center">
<div className="w-full max-w-xl space-y-6">
<h1 className="text-3xl font-bold">💊 Medication Reminders</h1>
 
          {nextMed ? (
<div className="p-4 rounded-lg bg-white/10 shadow">
<p className="text-lg font-semibold">
                Next: {nextMed.med.name} – {nextMed.med.dosage}
</p>
<p className="text-sm opacity-70">Time left: {countdown}</p>
</div>
          ) : (
<div className="p-4 rounded-lg bg-green-600/70 shadow">
<p className="text-lg font-semibold">
                ✅ No more medications today!
</p>
</div>
          )}
 
          <div>
<h2 className="text-2xl font-semibold mb-2">Today's Medications</h2>
<ul className="space-y-4">
              {dummyMeds.map((med, i) => (
<li key={i} className="bg-white/10 p-4 rounded-lg shadow-md">
<h3 className="text-lg font-semibold">{med.name}</h3>
<p>Dosage: {med.dosage}</p>
<p>Time: {med.time}</p>
</li>
              ))}
</ul>
</div>
 
          <div>
<h2 className="text-xl font-semibold mt-6 mb-2">📜 Past Medications</h2>
<p className="text-sm text-gray-300 italic">
              (This section will show meds already taken today.)
</p>
</div>
</div>
</div>
</>
  );
}