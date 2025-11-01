"use client";

import { useRouter } from "next/navigation";
import { puzzles, Puzzle } from "@/data/puzzles";
import ClueInput from "@/components/ClueInput";

interface PuzzlePageProps {
  params: { id: string };
}

export default function PuzzlePage({ params }: PuzzlePageProps) {
  const router = useRouter();
  const puzzle: Puzzle | undefined = puzzles.find((p) => p.id === params.id);

  if (!puzzle) return <p>Puzzle not found</p>;

  return (
    <div className="min-h-screen bg-purple-200 p-4">
      {/* Back button stays top-left */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-1 px-3 py-1 bg-purple-300 text-gray-800 rounded hover:bg-purple-400 mb-4 shadow-sm transition-colors"
      >
        ← Back
      </button>

      {/* Puzzle content horizontally centered */}
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4"> {puzzle.title} </h1>

        {puzzle.clues.map((clue) => (
          <div
            key={clue.id}
            className="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <ClueInput clue={clue} />
          </div>
        ))}
      </main>
    </div>

  );
}
