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
    <div className="min-h-screen bg-purple-200 p-4 flex flex-col items-center">
      <main className="flex flex-col items-center gap-8 w-full max-w-2xl relative">

        {/* Header for back button + author, aligned to start of clue block */}
        <div className="flex items-center gap-4 mb-2 w-full">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1 px-3 py-1 bg-purple-300 text-gray-800 rounded hover:bg-purple-400 shadow-sm transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Clues */}
        {puzzle.clues.map((clue) => (
          <div key={clue.id} className="w-full">
            <ClueInput clue={clue} />
          </div>
        ))}
      </main>
    </div>

  );
}
