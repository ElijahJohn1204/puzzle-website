"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { Clue } from "@/data/puzzles";

interface ClueInputProps {
  clue: Clue;
}

export default function ClueInput({ clue }: ClueInputProps) {
  const [letters, setLetters] = useState<string[]>(
    Array(clue.solution.length).fill("")
  );
  const [activeIndex, setActiveIndex] = useState(0); // current active input
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [revealedHints, setRevealedHints] = useState<Set<"indicator" | "fodder" | "definition">>(new Set());
  const [showHintMenu, setShowHintMenu] = useState(false);
  const [activeHint, setActiveHint] = useState<null | "indicator" | "fodder" | "definition">(null);

  const [solved, setSolved] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const hintColors = {
    indicator: "bg-yellow-300 text-black",
    fodder: "bg-blue-300 text-black",
    definition: "bg-green-300 text-black",
  };

  useEffect(() => {
    // Focus first blank on load
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleInput = (index: number, value: string) => {
    const newLetters = [...letters];
    newLetters[index] = value.toUpperCase();
    setLetters(newLetters);

    // Move to next input if available
    if (value && index < letters.length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkAnswer();
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      if (letters[index]) {
        handleInput(index, "");
      } else if (index > 0) {
        handleInput(index - 1, "");
        setActiveIndex(index - 1);
      }
    }

    if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
      handleInput(index, e.key);
    }
  };

  const checkAnswer = () => {
    const userAnswer = letters.join("").toUpperCase();
    const correct = userAnswer === clue.solution.toUpperCase();
    setSolved(correct);
    setShowResult(true);
  };

  const revealHint = (hint: "indicator" | "fodder" | "definition") => {
    setRevealedHints(prev => new Set(prev).add(hint));
    setActiveHint(hint);
    setShowHintMenu(false);
  };

const highlightClue = (text: string) => {
  type Highlight = { start: number; end: number; hint: "indicator" | "fodder" | "definition" };

  const highlights: Highlight[] = [];
  const hints: ("indicator" | "fodder" | "definition")[] = ["indicator", "fodder", "definition"];

  // Build highlight ranges for each revealed hint
  hints.forEach((hint) => {
    if (!revealedHints.has(hint)) return;

    const phrase = (clue as any)[hint];
    if (!phrase) return;

    // Regex for case-insensitive, whole word matching
    const regex = new RegExp(`\\b${phrase}\\b`, "gi");
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      highlights.push({ start: match.index, end: match.index + phrase.length, hint });
    }
  });

  // Sort highlights by start index
  highlights.sort((a, b) => a.start - b.start);

  const elements: JSX.Element[] = [];
  let cursor = 0;
  let keyCounter = 0;

  for (const hl of highlights) {
    // Add unhighlighted text before the highlight
    if (hl.start > cursor) {
      elements.push(<span key={keyCounter++}>{text.slice(cursor, hl.start)}</span>);
    }
    // Add highlighted text
    elements.push(
      <span key={keyCounter++} className={hintColors[hl.hint]}>
        {text.slice(hl.start, hl.end)}
      </span>
    );
    cursor = hl.end;
  }

  // Add remaining text
  if (cursor < text.length) {
    elements.push(<span key={keyCounter++}>{text.slice(cursor)}</span>);
  }

  return elements;
};


  return (
    <div className="p-4 rounded-lg bg-neutral-800 shadow-md relative">
      {/* Clue with highlighting */}
      <p className="mb-4 font-medium text-lg">{highlightClue(clue.text)}</p>

      {/* Letter input boxes */}
      <div className="flex gap-2 mb-4">
        {letters.map((letter, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            className={`w-10 h-10 text-center rounded-md ${
              idx === activeIndex ? "bg-yellow-200 text-black" : "bg-white text-black"
            }`}
            value={letter}
            onChange={() => {}}
            onKeyDown={(e) => handleKeyDown(idx, e)}
          />
        ))}
      </div>

      <button
        onClick={checkAnswer}
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Check
      </button>

      <button
        onClick={() => setShowHintMenu(true)}
        className="ml-4 px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
      >
        Hint
      </button>

      {/* Hint menu popup */}
      {showHintMenu && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50">
          <div className="bg-neutral-900 p-6 rounded-lg relative w-80 flex flex-col gap-3">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setShowHintMenu(false)}
            >
              ✕
            </button>

            {(["indicator", "fodder", "definition"] as const).map((hint) => (
              <button
                key={hint}
                className={`px-3 py-2 rounded font-semibold ${hintColors[hint]}`}
                onClick={() => revealHint(hint)}
              >
                Reveal {hint}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Explanation popup */}
      {activeHint && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50">
          <div className="bg-neutral-900 p-6 rounded-lg relative w-80 flex flex-col gap-3">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setActiveHint(null)}
            >
              ✕
            </button>

            <p className="text-gray-300 text-sm">
              {clue.explanation?.[activeHint] || "No explanation available."}
            </p>
          </div>
        </div>
      )}

      {/* Result block */}
      {showResult && solved !== null && (
        <div className="mt-4 p-4 rounded-lg bg-green-600 text-white shadow-lg animate-slide-up">
          <p>{solved ? "Correct! 🎉" : "Not quite! 😅"}</p>
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied!");
              }}
            >
              Share Link
            </button>
            <span>{solved ? "✅" : "❌"}</span>
          </div>
        </div>
      )}

      {showResult && solved !== null && (
        <div className="mt-4 p-4 rounded-lg bg-neutral-800 text-white shadow-md space-y-3">
          {/* Video block */}
          <div className="w-full aspect-video">
            <iframe
              src={clue.videoUrl || ""}
              title="Clue Explanation"
              className="w-full h-full rounded"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          {/* Explanation text */}
          {(["indicator", "fodder", "definition"] as const).map((hint) => (
            <p key={hint}>
              <strong>{hint}:</strong> {clue.explanation?.[hint]}
            </p>
          ))}
        </div>
      )}

    </div>
  );
}
