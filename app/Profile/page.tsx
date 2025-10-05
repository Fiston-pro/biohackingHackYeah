"use client";
import React from "react";
import NavBar from "../components/NavBar";
 
export default function ProfilePage() {
  const personalInfo = {
    name: "Bogdan Kavya",
    age: 29,
    gender: "Male",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
    bloodType: "O+",
  };
 
  const smartwatchData = {
    heartRate: 78,
    sleepHours: 7.2,
    steps: 10543,
    calories: 530,
  };
 
  const medications = [
    { name: "Atorvastatin", dosage: "10mg", frequency: "Once daily" },
    { name: "Lisinopril", dosage: "5mg", frequency: "Once daily" },
  ];
 
  const medicalHistory = [
    "Hypertension",
    "Mild Asthma",
    "Allergy to penicillin",
  ];
 
  const emergencyContact = {
    name: "Jane Doe",
    relation: "Sister",
    phone: "+321 654 0987",
  };
 
  return (
<>
<NavBar />
<div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white px-4 py-8">
<div className="max-w-4xl mx-auto space-y-8">
<h1 className="text-3xl font-bold text-center mb-4">🧬 Your Profile</h1>
 
          {/* Personal Info */}
<section className="bg-white/10 p-4 rounded-lg shadow-md">
<h2 className="text-xl font-semibold mb-2">👤 Personal Information</h2>
<ul className="space-y-1 text-sm sm:text-base">
<li><strong>Name:</strong> {personalInfo.name}</li>
<li><strong>Age:</strong> {personalInfo.age}</li>
<li><strong>Gender:</strong> {personalInfo.gender}</li>
<li><strong>Email:</strong> {personalInfo.email}</li>
<li><strong>Phone:</strong> {personalInfo.phone}</li>
<li><strong>Blood Type:</strong> {personalInfo.bloodType}</li>
</ul>
</section>
 
          {/* Smartwatch Metrics */}
<section className="bg-white/10 p-4 rounded-lg shadow-md">
<h2 className="text-xl font-semibold mb-4">⌚ Smartwatch Metrics</h2>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
<div className="bg-white/10 p-3 rounded-lg shadow">
<p className="text-lg font-bold">{smartwatchData.heartRate} bpm</p>
<p className="text-sm">Heart Rate</p>
</div>
<div className="bg-white/10 p-3 rounded-lg shadow">
<p className="text-lg font-bold">{smartwatchData.sleepHours} hrs</p>
<p className="text-sm">Sleep</p>
</div>
<div className="bg-white/10 p-3 rounded-lg shadow">
<p className="text-lg font-bold">{smartwatchData.steps}</p>
<p className="text-sm">Steps</p>
</div>
<div className="bg-white/10 p-3 rounded-lg shadow">
<p className="text-lg font-bold">{smartwatchData.calories}</p>
<p className="text-sm">Calories</p>
</div>
</div>
<p className="text-sm mt-2 italic opacity-70">* Syncs daily from your smartwatch</p>
</section>
 
          {/* Medical History */}
<section className="bg-white/10 p-4 rounded-lg shadow-md">
<h2 className="text-xl font-semibold mb-2">🩺 Medical History</h2>
<ul className="list-disc list-inside text-sm sm:text-base">
              {medicalHistory.map((item, i) => (
<li key={i}>{item}</li>
              ))}
</ul>
</section>
 
          {/* Medications */}
<section className="bg-white/10 p-4 rounded-lg shadow-md">
<h2 className="text-xl font-semibold mb-2">💊 Current Medications</h2>
<ul className="space-y-2">
              {medications.map((med, i) => (
<li key={i} className="bg-white/10 p-3 rounded-md">
<strong>{med.name}</strong> — {med.dosage} — {med.frequency}
</li>
              ))}
</ul>
</section>
 
          {/* Emergency Contact */}
<section className="bg-white/10 p-4 rounded-lg shadow-md">
<h2 className="text-xl font-semibold mb-2">🚨 Emergency Contact</h2>
<ul className="text-sm sm:text-base">
<li><strong>Name:</strong> {emergencyContact.name}</li>
<li><strong>Relation:</strong> {emergencyContact.relation}</li>
<li><strong>Phone:</strong> {emergencyContact.phone}</li>
</ul>
</section>
 
          {/* Appointments Shortcut */}
<section className="text-center">
<a
              href="/Appointments"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow transition"
>
              View Appointments
</a>
</section>
</div>
</div>
</>
  );
}