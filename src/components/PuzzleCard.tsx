"use client";
import { useState } from "react";

interface PuzzleCardProps {
  clue: string;
  answer: string;
  explanation: string;
}

export default function PuzzleCard({ clue, answer, explanation }: PuzzleCardProps) {
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const isCorrect = guess.trim().toUpperCase() === answer.toUpperCase();

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-orange-100 shadow-xl rounded-3xl px-8 py-10 text-center max-w-xl w-full space-y-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{clue}</h1>

      <input
        type="text"
        placeholder="Enter your answer"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="w-80 mx-auto block rounded-full text-center text-xl py-3 px-5 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all"
      />

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setChecked(true)}
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 active:scale-95 transition-all shadow-md"
        >
          Check
        </button>
        <button
          onClick={() => setRevealed(true)}
          className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 active:scale-95 transition-all"
        >
          Reveal
        </button>
      </div>

      {checked && (
        <p className={`text-xl font-semibold ${isCorrect ? "text-green-600" : "text-red-500"}`}>
          {isCorrect ? "🎉 Correct!" : "❌ Not quite!"}
        </p>
      )}

      {revealed && (
        <div className="text-left bg-orange-50 border border-orange-100 rounded-2xl p-6 shadow-inner">
          <p className="text-xl font-semibold text-orange-700">
            Answer: <span className="font-bold">{answer}</span>
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}
