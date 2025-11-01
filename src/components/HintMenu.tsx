"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HintMenuProps {
  indicator: string;
  fodder: string;
  definition: string;
  onUseHint?: () => void;
}

export default function HintMenu({ indicator, fodder, definition, onUseHint }: HintMenuProps) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState({
    indicator: false,
    fodder: false,
    definition: false,
  });

  const toggleReveal = (type: keyof typeof revealed) => {
    setRevealed((r) => {
      const newState = { ...r, [type]: !r[type] };
      if (!r[type]) onUseHint?.(); // Only count as "using a hint" the first time
      return newState;
    });
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
      >
        Hint
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-0 mt-2 w-56 bg-neutral-900 border border-gray-700 rounded-md shadow-lg p-2 z-10"
          >
            {["indicator", "fodder", "definition"].map((type) => (
              <div key={type} className="mb-2">
                <button
                  onClick={() => toggleReveal(type as keyof typeof revealed)}
                  className="w-full text-left text-sm text-gray-200 hover:text-white"
                >
                  {revealed[type as keyof typeof revealed]
                    ? `Hide ${type}`
                    : `Reveal ${type}`}
                </button>

                {revealed[type as keyof typeof revealed] && (
                  <div className="mt-1 text-gray-400 text-sm pl-3 italic">
                    {type === "indicator" && indicator}
                    {type === "fodder" && fodder}
                    {type === "definition" && definition}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
