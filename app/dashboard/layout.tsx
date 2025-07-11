"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiHome, FiBookOpen, FiPlusCircle } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <aside className="hidden md:flex flex-col w-64 bg-gray-100 p-4 space-y-4">
        <h2 className="text-xl font-bold">Recipe App</h2>

        <nav className="flex flex-col space-y-2">
          <Link
            href="/dashboard"
            className="hover:underline flex items-center gap-2"
          >
            <FiHome /> Dashboard
          </Link>

          <Link
            href="/dashboard/recipes"
            className="hover:underline flex items-center gap-2"
          >
            <FiBookOpen /> My Recipes
          </Link>

          <Link
            href="/dashboard/new"
            className="hover:underline flex items-center gap-2"
          >
            <FiPlusCircle /> Create Recipe
          </Link>
        </nav>
      </aside>
      {/* Main Content */}

      <main className="flex-1 p-4">
        {/* Mobile Top Bar */}

        <div className="md:hidden mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Recipe App</h1>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {/* Mobile Menu */}

        {menuOpen && (
          <nav className="md:hidden mb-4 flex flex-col space-y-2 bg-gray-100 p-4 rounded">
            <Link
              href="/dashboard"
              className="hover:underline flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <FiHome /> Dashboard
            </Link>

            <Link
              href="/dashboard/recipes"
              className="hover:underline flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <FiBookOpen /> My Recipes
            </Link>

            <Link
              href="/dashboard/new"
              className="hover:underline flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <FiPlusCircle /> Create Recipe
            </Link>
          </nav>
        )}
        {children}
      </main>
    </div>
  );
}

{
  /* FOR WHEN WE DO AUTH 
    
    import { redirect } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false; // Replace with real auth logic

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    // ... layout with nav
  );
}
*/
}
