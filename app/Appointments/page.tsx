"use client";
import React from "react";
import NavBar from "../components/NavBar";
 
// Icons for each appointment type
const typeIcons: { [key: string]: string } = {
  "General Check-up": "🩺",
  "Dental Cleaning": "🦷",
  "Eye Exam": "👁️",
  "Cardiology Follow-Up": "❤️",
  "Physiotherapy": "🏃‍♂️",
};
 
const upcomingAppointments = [
  {
    type: "General Check-up",
    date: "2025-07-25",
    time: "10:00 AM",
    doctor: "Dr. Jane Smith",
  },
  {
    type: "Dental Cleaning",
    date: "2025-07-28",
    time: "2:00 PM",
    doctor: "Dr. Michael Green",
  },
];
 
const pastAppointments = [
  {
    type: "Eye Exam",
    date: "2025-06-20",
    time: "11:30 AM",
    doctor: "Dr. Amanda Ray",
    notes: "Vision test normal. Prescription updated.",
  },
  {
    type: "Cardiology Follow-Up",
    date: "2025-06-05",
    time: "3:00 PM",
    doctor: "Dr. John Lee",
    notes: "All vitals stable. Next check in 6 months.",
  },
];
 
export default function Appointments() {
  return (
<>
<NavBar />
<div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white p-6 flex justify-center">
<div className="w-full max-w-2xl space-y-10">
<h1 className="text-3xl font-bold">📅 Your Appointments</h1>
 
          {/* Upcoming Appointments */}
<section>
<h2 className="text-xl font-semibold mb-2">⏳ Upcoming Appointments</h2>
            {upcomingAppointments.length > 0 ? (
<ul className="space-y-4">
                {upcomingAppointments.map((appt, i) => (
<li
                    key={i}
                    className="bg-green-500/10 p-4 rounded-lg shadow-md border border-green-300 hover:bg-green-500/20 transition"
>
<h3 className="text-lg font-semibold">
                      {typeIcons[appt.type] || "📌"} {appt.type}
</h3>
<p className="text-sm">
                      Date: {appt.date} | Time: {appt.time}
</p>
<p className="text-sm opacity-70">With {appt.doctor}</p>
</li>
                ))}
</ul>
            ) : (
<p className="text-sm italic text-gray-300">No upcoming appointments.</p>
            )}
</section>
 
          {/* Past Appointments */}
<section>
<h2 className="text-xl font-semibold mb-2">📁 Past Appointments</h2>
            {pastAppointments.length > 0 ? (
<ul className="space-y-4">
                {pastAppointments.map((appt, i) => (
<li
                    key={i}
                    className="bg-white/10 p-4 rounded-lg shadow-md hover:bg-white/20 transition"
>
<h3 className="text-lg font-semibold">
                      {typeIcons[appt.type] || "📌"} {appt.type}
</h3>
<p className="text-sm">
                      Date: {appt.date} | Time: {appt.time}
</p>
<p className="text-sm opacity-70">With {appt.doctor}</p>
<p className="text-sm mt-2 italic opacity-90">{appt.notes}</p>
</li>
                ))}
</ul>
            ) : (
<p className="text-sm italic text-gray-300">No past appointments.</p>
            )}
</section>
</div>
</div>
</>
  );
}