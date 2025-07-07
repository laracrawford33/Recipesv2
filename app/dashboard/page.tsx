import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/recipes" className="text-blue-600 hover:underline">
            📖 My Recipes
          </Link>
        </li>
        <li>
          <Link href="/dashboard/new" className="text-blue-600 hover:underline">
            ➕ Create New Recipe
          </Link>
        </li>
      </ul>
    </div>
  );
}