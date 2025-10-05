"use client";
import React from "react";
import NavBar from "../components/NavBar";
 
const upcomingReports = [
  {
    type: "MRI – Brain",
    date: "2025-08-01",
    doctor: "Dr. Olivia Martin",
    notes: "Scheduled, awaiting scan.",
  },
];
 
const pastReports = [
  {
    type: "Blood Test",
    date: "2025-06-30",
    result: "Normal CBC, Slightly elevated cholesterol.",
    doctor: "Dr. Sarah Lee",
  },
  {
    type: "X-Ray – Chest",
    date: "2025-06-15",
    result: "Clear lungs, no abnormalities detected.",
    doctor: "Dr. Ahmed Noor",
  },
];
 
export default function LabReports() {
  return (
<>
<NavBar />
<div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white p-6 flex justify-center">
<div className="w-full max-w-2xl space-y-10">
<h1 className="text-3xl font-bold">🧪 Lab Reports & Appointments</h1>
 
          {/* Upcoming */}
<section>
<h2 className="text-xl font-semibold mb-2">📅 Upcoming Appointments</h2>
            {upcomingReports.length > 0 ? (
<ul className="space-y-4">
                {upcomingReports.map((report, i) => (
<li
                    key={i}
                    className="bg-yellow-500/10 p-4 rounded-lg shadow-md border border-yellow-300"
>
<h3 className="text-lg font-semibold">{report.type}</h3>
<p className="text-sm">Date: {report.date}</p>
<p className="text-sm">Doctor: {report.doctor}</p>
<p className="text-sm opacity-80 italic">{report.notes}</p>
</li>
                ))}
</ul>
            ) : (
<p className="text-sm italic text-gray-300">No upcoming reports.</p>
            )}
</section>
 
          {/* Past */}
<section>
<h2 className="text-xl font-semibold mb-2">📁 Past Reports</h2>
<ul className="space-y-4">
              {pastReports.map((report, i) => (
<li
                  key={i}
                  className="bg-white/10 p-4 rounded-lg shadow-md hover:bg-white/20 transition"
>
<h3 className="text-lg font-semibold">{report.type}</h3>
<p>Date: {report.date}</p>
<p>Results: {report.result}</p>
<p className="text-sm opacity-70">Reviewed by {report.doctor}</p>
</li>
              ))}
</ul>
</section>
</div>
</div>
</>
  );
}