"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { Clue } from "@/data/puzzles";
import { motion, AnimatePresence } from "framer-motion";

interface ClueInputProps {
  clue: Clue;
}

export default function ClueInput({ clue }: ClueInputProps) {
  const solutionWords = clue.solution.split(" ");
  const [letters, setLetters] = useState(solutionWords.map((w) => Array(w.length).fill("")));
  const [revealedHints, setRevealedHints] = useState<
    Set<"indicator" | "fodder" | "definition">
  >(new Set());
  const [showHintPopup, setShowHintPopup] = useState(false);
  const [showExplanationPopup, setShowExplanationPopup] = useState(false);
  const [currentExplanationType, setCurrentExplanationType] = useState<"indicator" | "fodder" | "definition" | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [activePos, setActivePos] = useState<{ w: number; i: number }>({ w: 0, i: 0 });
  

  const isAnswerFilled = letters.every((word) => word.every((letter) => letter !== ""));
  

  const inputRefs = useRef<HTMLInputElement[][]>(
    solutionWords.map((word) => Array(word.length).fill(null))
  );

  useEffect(() => {
    inputRefs.current[0][0]?.focus();
  }, []);

  const hintColors = {
    indicator: "bg-pink-300 text-black",
    fodder: "bg-blue-300 text-black",
    definition: "bg-green-300 text-black",
  };

  const normalize = (s: string) => s.replace(/[^\w\s]/g, "").toLowerCase();

  // ✅ Improved highlightClue — respects phrase-level matches
  const highlightClue = (text: string) => {
    const elements: JSX.Element[] = [];
    let remainingText = text;

    const hintTypes: ("indicator" | "fodder" | "definition")[] = [
      "indicator",
      "fodder",
      "definition",
    ];

    // Helper to process hints inside a segment
    const processHints = (segment: string) => {
      const segElements: JSX.Element[] = [];
      let segRemaining = segment;

      while (segRemaining.length > 0) {
        let earliestIdx = segRemaining.length;
        let matchedType: "indicator" | "fodder" | "definition" | null = null;
        let matchedPhrase: string | null = null;

        for (const hintType of hintTypes) {
          if (!revealedHints.has(hintType)) continue;

          const phrases = Array.isArray((clue as any)[hintType])
            ? (clue as any)[hintType]
            : [(clue as any)[hintType]];

          for (const phrase of phrases) {
            const idx = segRemaining.toLowerCase().indexOf(phrase.toLowerCase());
            if (idx !== -1 && idx < earliestIdx) {
              earliestIdx = idx;
              matchedType = hintType;
              matchedPhrase = segRemaining.slice(idx, idx + phrase.length);
            }
          }
        }

        if (!matchedType || !matchedPhrase) {
          segElements.push(<span key={Math.random()}>{segRemaining}</span>);
          break;
        }

        if (earliestIdx > 0) {
          segElements.push(<span key={Math.random()}>{segRemaining.slice(0, earliestIdx)}</span>);
        }

        segElements.push(
          <span
            key={Math.random()}
            className={`${hintColors[matchedType]} px-1 rounded`}
          >
            {matchedPhrase}
          </span>
        );

        segRemaining = segRemaining.slice(earliestIdx + matchedPhrase.length);
      }

      return segElements;
    };

    while (remainingText.length > 0) {
      let earliestIdx = remainingText.length;
      let matchedType: "nowrap" | "indicator" | "fodder" | "definition" | null = null;
      let matchedPhrase: string | null = null;

      // --- Check nowrap sequences ---
      if (clue.nowrapSequences) {
        for (const seq of clue.nowrapSequences) {
          const idx = remainingText.toLowerCase().indexOf(seq.toLowerCase());
          if (idx !== -1 && idx < earliestIdx) {
            earliestIdx = idx;
            matchedType = "nowrap";
            matchedPhrase = seq;
          }
        }
      }

      // --- Check revealed hints ---
      for (const hintType of hintTypes) {
        if (!revealedHints.has(hintType)) continue;

        const phrases = Array.isArray((clue as any)[hintType])
          ? (clue as any)[hintType]
          : [(clue as any)[hintType]];

        for (const phrase of phrases) {
          const idx = remainingText.toLowerCase().indexOf(phrase.toLowerCase());
          if (idx !== -1 && idx < earliestIdx) {
            earliestIdx = idx;
            matchedType = hintType;
            matchedPhrase = remainingText.slice(idx, idx + phrase.length);
          }
        }
      }

      // --- No match: push remaining text and break ---
      if (!matchedType || !matchedPhrase) {
        elements.push(<span key={Math.random()}>{remainingText}</span>);
        break;
      }

      // --- Text before match ---
      if (earliestIdx > 0) {
        elements.push(
          <span key={Math.random()}>{remainingText.slice(0, earliestIdx)}</span>
        );
      }

      // --- Matched element ---
      if (matchedType === "nowrap") {
        // Wrap in whitespace-nowrap, but also highlight any revealed hints inside
        elements.push(
          <span key={Math.random()} className="whitespace-nowrap">
            {processHints(matchedPhrase)}
          </span>
        );
      } else {
        elements.push(
          <span
            key={Math.random()}
            className={`${hintColors[matchedType]} px-1 rounded`}
          >
            {matchedPhrase}
          </span>
        );
      }

      // --- Remove matched text from remaining ---
      remainingText = remainingText.slice(earliestIdx + matchedPhrase.length);
    }

    return elements;
  };

  // --- Input handling ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, wIndex: number, i: number) => {
    const value = e.target.value.toLowerCase().slice(-1);
    const newLetters = [...letters];
    newLetters[wIndex][i] = value;
    setLetters(newLetters);

    // Move to next input
    if (value) {
      if (inputRefs.current[wIndex][i + 1]) {
        setActivePos({ w: wIndex, i: i + 1 });
        inputRefs.current[wIndex][i + 1]?.focus();
      } else if (wIndex + 1 < inputRefs.current.length) {
        setActivePos({ w: wIndex + 1, i: 0 });
        inputRefs.current[wIndex + 1][0]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    wIndex: number,
    i: number
  ) => {
    if (e.key === "Backspace") {
      const newLetters = [...letters];
      if (letters[wIndex][i]) {
        newLetters[wIndex][i] = "";
        setLetters(newLetters);
        setActivePos({ w: wIndex, i });
      } else if (i > 0) {
        setActivePos({ w: wIndex, i: i - 1 });
        inputRefs.current[wIndex][i - 1]?.focus();
      } else if (wIndex > 0) {
        const prevWord = inputRefs.current[wIndex - 1];
        setActivePos({ w: wIndex - 1, i: prevWord.length - 1 });
        prevWord[prevWord.length - 1]?.focus();
      }
    }
    if (e.key === "Enter") handleCheck();
  };

  const handleCheck = () => {
    const answer = letters.map((arr) => arr.join("")).join(" ");
    const correct = normalize(answer) === normalize(clue.solution);
    setIsCorrect(correct);
    setShowResult(true);

    if (!correct) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const toggleHint = (hint: "indicator" | "fodder" | "definition") => {
    setRevealedHints((prev) => new Set(prev).add(hint));
    setShowHintPopup(false);
    setCurrentExplanationType(hint);
    setShowExplanationPopup(true);
  };

  return (
    <div className="min-h-screen bg-purple-200">
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.5s;
          }
      `}</style>
      {/* Center the clue horizontally */}
      <div className="flex justify-center mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full text-center">
          <p className="text-2xl font-semibold text-gray-800 leading-relaxed">
            {highlightClue(clue.text)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className={`flex gap-5 ${isShaking ? 'animate-shake' : ''}`}>
          {letters.map((word, wIndex) => (
            <div
              key={wIndex}
              className="flex border-2 border-gray-900 rounded-lg overflow-hidden"
            >
              {word.map((letter, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    if (!inputRefs.current[wIndex]) inputRefs.current[wIndex] = [];
                    inputRefs.current[wIndex][i] = el!;
                  }}
                  type="text"
                  maxLength={1}
                  value={letter}
                  onChange={(e) => handleChange(e, wIndex, i)}
                  onKeyDown={(e) => handleKeyDown(e, wIndex, i)}
                  className={`w-10 h-10 text-center text-black border-r border-gray-400 focus:outline-none text-lg font-medium caret-transparent ${
                    activePos.w === wIndex && activePos.i === i
                      ? "bg-blue-300 border-blue-300"
                      : "bg-white"
                  }`}              />
              ))}
            </div>
          ))}
        </div>

        {/* Detached Buttons */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => setShowHintPopup(true)}
            className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg shadow-md transition"
          >
            Hint
          </button>
            <button
              onClick={handleCheck}
              disabled={!isAnswerFilled}
              className={`px-5 py-2 rounded-lg shadow-md transition 
                ${isAnswerFilled ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
            >
            Check
          </button>
        </div>
      </div>

      {showHintPopup && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-80">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowHintPopup(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Hints</h3>
            {(["indicator", "fodder", "definition"] as const).map((hint) => (
              <button
                key={hint}
                onClick={() => toggleHint(hint)}
                className={`block w-full my-1 px-3 py-2 rounded font-semibold ${hintColors[hint]} transition`}
              >
                Reveal {hint}
              </button>
            ))}
          </div>
        </div>
      )}

            {/* Explanation Popup */}
      {showExplanationPopup && currentExplanationType && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowExplanationPopup(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
              {currentExplanationType}
            </h3>
            <p className="text-gray-700">
              {clue.explanation[currentExplanationType]}
            </p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showResult && isCorrect && (
          <div className="mt-6 w-full max-w-2xl flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white/80 rounded-lg shadow-md text-center w-full flex flex-col items-center gap-4"
            >
              {/* Correct message */}
              <p className="text-xl font-bold text-green-600">✅ Correct!</p>

              {/* Embedded video */}
              <div className="w-full aspect-video">
                <iframe
                  src={clue.videoUrl}
                  title="Explanation Video"
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>

              {/* Hint explanations */}
              <div className="flex flex-col gap-2 w-full text-left">
                <p className="text-gray-700">
                  <span className="font-semibold">Indicator:</span> {clue.explanation.indicator}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Fodder:</span> {clue.explanation.fodder}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Definition:</span> {clue.explanation.definition}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
