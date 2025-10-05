'use client';
 
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
 
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
 
  const toggleMenu = () => setIsOpen(!isOpen);
 
  return (
<nav className="bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-900 text-white shadow-md sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16">
<Link href="/" className="flex items-center space-x-2">
<div className="flex items-center space-x-2">
<Image
    src="/CareMateLogo-2.png"
    alt="CareMate Logo"
    width={40}
    height={40}
    className="rounded-full"
  />
<span className="text-xl font-bold tracking-wide">CareMate</span>
</div>
</Link>
 
          {/* Desktop menu */}
<div className="hidden md:block">
<div className="ml-10 flex items-baseline space-x-4">
<NavLink href="/" active={pathname === '/'}>Home</NavLink>
<NavLink href="/LabReports" active={pathname === '/LabReports'}>Lab Reports</NavLink>
<NavLink href="/Appointments" active={pathname === '/Appointments'}>Appointments</NavLink>
<NavLink href="/Medications" active={pathname === '/Medications'}>Medications</NavLink>
<div className="hidden md:flex items-center space-x-4">
<Link href="/Profile" className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-md transition">
<div className="w-8 h-8 bg-white text-indigo-800 font-bold rounded-full flex items-center justify-center">
      U
</div>
<span className="hidden lg:inline text-sm">Profile</span>
</Link>
</div>
</div>
</div>
 
          {/* Mobile button */}
<div className="md:hidden">
<button
              onClick={toggleMenu}
              type="button"
              className="text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
>
<svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
>
                {isOpen ? (
<path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
<path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
</svg>
</button>
</div>
</div>
</div>

 
      {/* Mobile menu */}
      {isOpen && (
<div className="md:hidden px-4 pb-4 space-y-2" id="mobile-menu">
<NavLink href="/" active={pathname === '/'} mobile>Home</NavLink>
<NavLink href="/LabReports" active={pathname === '/LabReports'}mobile>Lab Reports</NavLink>
<NavLink href="/Appointments" active={pathname === '/Appointments'}mobile>Appointments</NavLink>
<NavLink href="/Medications" active={pathname === '/Medications'}mobile>Medications</NavLink>
<NavLink href="/Profile" active={pathname === '/Profile'} mobile>Profile</NavLink>
</div>
      )}
</nav>
  );
}
 
function NavLink({
  href,
  children,
  active,
  mobile = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  mobile?: boolean;
}) {
  const base = mobile
    ? 'block px-3 py-2 rounded-md text-base font-medium'
    : 'px-3 py-2 rounded-md text-sm font-medium';
 
  const activeStyle = active ? 'bg-white text-indigo-900 font-bold' : 'hover:bg-white/20';
 
  return (
<Link href={href} className={`${base} ${activeStyle} transition-colors`}>
      {children}
</Link>
  );
}