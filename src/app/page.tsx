// src/app/page.tsx
import Link from "next/link";
import { puzzles } from "@/data/puzzles";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Puzzle Archive</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {puzzles.map((puzzle) => (
          <Link
            key={puzzle.id}
            href={`/puzzles/${puzzle.id}`}
            className="block bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-2">{puzzle.title}</h2>
            <p className="text-sm">Date: {puzzle.date}</p>
            <p className="text-sm">Clues: {puzzle.clueCount}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
