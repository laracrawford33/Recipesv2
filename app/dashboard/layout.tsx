// app/dashboard/layout.tsx
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-100 p-4 space-y-4">
        <h2 className="text-xl font-bold">🍳 Recipe App</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/dashboard/recipes" className="hover:underline">My Recipes</Link>
          <Link href="/dashboard/new" className="hover:underline">Create Recipe</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Top bar for mobile */}
        <div className="md:hidden mb-4">
          <h1 className="text-xl font-bold">🍳 Recipe App</h1>
          {/* Optional: Add hamburger menu here */}
        </div>
        {children}
      </main>
    </div>
  );
}

{ /* FOR WHEN WE DO AUTH 
    
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
*/}