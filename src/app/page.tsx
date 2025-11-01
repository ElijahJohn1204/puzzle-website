// src/app/page.tsx
import Link from "next/link";
import { puzzles } from "@/data/puzzles";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-purple-100 p-6">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
          Puzzle Archive
        </h1>
        <p className="text-gray-600 text-lg">
          Explore puzzles and challenge your brain!
        </p>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {puzzles.map((puzzle) => (
          <Link
            key={puzzle.id}
            href={`/puzzles/${puzzle.id}`}
            className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:bg-white/80 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              {puzzle.title}
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>By Member: {puzzle.author}</p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
