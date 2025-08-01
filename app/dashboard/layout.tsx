"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiHome, FiBookOpen, FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // Adjust the import based on your Firebase setup

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    router.push("/"); // Redirect to login page
    auth.signOut();
    console.log("User logged out");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <aside className="hidden md:flex flex-col w-48 bg-gray-300 p-4">
        <div className="flex flex-col flex-1">
          <Link
            href="/dashboard"
            className="hover:underline flex items-center gap-2"
          >
            <h2 className="text-xl font-bold">Recipe App</h2>
          </Link>

          <nav className="mt-4 flex-1 flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className="hover:underline flex items-center gap-2"
            >
              <FiHome /> Home
            </Link>

            <Link
              href="/dashboard/recipes"
              className="hover:underline flex items-center gap-2"
            >
              <FiBookOpen /> Search
            </Link>

            <Link
              href="/dashboard/new"
              className="hover:underline flex items-center gap-2"
            >
              <FiPlusCircle /> Create Recipe
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="text-white bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded mt-auto"
          >
            Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}

      <main className="flex-1 p-4 bg-gray-200">
        {/* Mobile Top Bar */}

        <div className="md:hidden mb-4 flex justify-between items-center">
          <Link
            href="/dashboard"
            className="hover:underline flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <h1 className="text-xl font-bold">Recipe App</h1>
          </Link>
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
              <FiHome /> Home
            </Link>

            <Link
              href="/dashboard/recipes"
              className="hover:underline flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <FiBookOpen /> Search
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
