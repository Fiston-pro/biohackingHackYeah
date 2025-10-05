import React from 'react';
import NavBar from '../components/NavBar';

export default function Prescriptions() {
  return (
        <>
          <NavBar />
<div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white p-6">
<h1 className="text-3xl font-bold mb-4 text-primary">Your Prescriptions</h1>
<ul className="space-y-4">
<li className="bg-white/10 p-4 rounded-lg shadow-md">
<h2 className="text-lg font-semibold">Paracetamol 500mg</h2>
<p>Take 1 tablet every 8 hours after meals for 5 days.</p>
<p className="text-sm opacity-70">Prescribed by Dr. Jane Smith on 2025-07-01</p>
</li>
<li className="bg-white/10 p-4 rounded-lg shadow-md">
<h2 className="text-lg font-semibold">Amoxicillin 250mg</h2>
<p>Take 1 capsule every 12 hours for 7 days.</p>
<p className="text-sm opacity-70">Prescribed by Dr. James Brown on 2025-06-25</p>
</li>
</ul>
</div>
        </>
  );
}